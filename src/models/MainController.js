import { ZodError } from 'zod'
import MainError from './MainError.js'
import UserController from './user/UserController.js'
import PixeController from './pixe/PixeController.js'


class MainController {
    static async validateUserRequest(userRequest) {
        if (!(userRequest instanceof Object)) throw new MainError('User request must be an object', 400)
        if (typeof userRequest.id !== 'number') throw new MainError('User id must be a number', 400)
        if (typeof userRequest.role !== 'string') throw new MainError('User role must be a string', 400)
        if (Number.isNaN(userRequest.id)) throw new MainError('User id must be a number', 400)
    }
    static async checkRolePermissions(role, requiredRoles) {
        if (requiredRoles.includes('*')) return
        if (!requiredRoles.includes(role)) {
            throw new MainError('User does not have permission', 403)
        }
    }   

    static async checkUserPermissionsInPixe(userId, pixeId, requiredRoles) {
        if (requiredRoles.includes('*')) return
        const pixe = await PixeController.getById({ id: pixeId, userId })
        const user = pixe.users.find(u => u.id === userId)
        if (!user || !requiredRoles.includes(user.role)) {
            throw new MainError('User does not have permission', 403)
        }
    }

    static async handleRequest(serviceMethod, body) {
        const result = { status: 400, error: '', data: null }

        try {
            const data = await serviceMethod(body)
            result.status = 200
            result.data = data
        } catch (e) {
            if (e instanceof ZodError) {
                const error = new MainError()
                const { path, message } = e.errors[0]
                result.status = 400
                result.error = `Invalid data, ${path.join('.')}: ${message}`
                error.message = result.error
                error.statusCode = result.status
                error.stack = e.stack
                error.path = 'MainController.handleRequest.ZodError.'+serviceMethod
                error.params = JSON.stringify(body)
                console.error(error)
            } else if (e instanceof MainError || e instanceof MainError) {
                result.status = e.statusCode
                result.error = e.message
                e.path = `MainController.handleRequest.${e.name}.`+serviceMethod
                e.params = JSON.stringify(body)
                console.error(e)
            } else {
                result.status = 500
                result.error = e.message || 'Internal server error' 
                e.path = 'MainController.handleRequest.Error'+serviceMethod
                e.params = JSON.stringify(body)
                console.error(e)
            }
        }

        return result
    }

    async getPixeById(userRequest, body = { id }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            return await PixeController.getById({ ...body, userId: userRequest.id })
        }, body)
    }
    
    async createWidget(userRequest, body = { countryCode, firstName, lastName, patronymic, photoUrl, phone, description }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['*'])
            return await UserController.createWidget(body)
        }, body)
    }

    async createUser(userRequest, body = { countryCode, firstName, lastName, patronymic, photoUrl, phone, description: null }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['*'])
            return await UserController.create(body)
        }, body)
    }

    async getUserById(userRequest, body = { id }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            return await UserController.getById(body)
        }, body)
    }

    async getUserByPhone(userRequest, body = { phone }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root'])
            return await UserController.getByPhone(body)
        }, body)
    }

    async getUsersByIds(userRequest, body = { ids }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            return await UserController.getByIds(body)
        }, body)
    }

    async updateUserInfo(userRequest, body = { id, info }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id !== body.id) throw new MainError('User can update only own info', 403)
            return await UserController.updateInfo(body)
        }, body)
    }

    async createChildren(userRequest, body = { name, parentId }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.parentId, ['root', 'admin'])
            return await PixeController.createChildren({ ...body, creatorId: userRequest.id })
        }, body)
    }

    async createCompany(userRequest, body = { name }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            return await PixeController.createCompany({ ...body, ownerId: userRequest.id })
        }, body)
    }

    async updateUserRoleFromPixe(userRequest, body = { id, user: { id, role } }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id === body.user.id) throw new MainError('You can not add yourself', 400)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            return await PixeController.updateUserRole(body)
        }, body)
    }

    async updateUserRoleInPixeAndChildrens(userRequest, body = { id, user }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id === body.user.id) throw new MainError('You can not add yourself', 400)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])

            const result = await PixeController.updateUserRoleInPixeAndChildrens(body)
            const user = await UserController.getById({ id: body.user.id })
            if (user.role === 'guest') {
                await UserController.updateRole({ id: body.user.id, role: 'user' })
            }
            return result
        }, body)
    }

    async moveWidgetToPixe(userRequest, body = { sourceId, targetId, widgetId }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.sourceId, ['root'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.targetId, ['root'])
            return await PixeController.moveWidgetToPixe(body)
        }, body)
    }

    async moveUserToPixe(userRequest, body = { sourceId, targetId, userId }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id === body.userId) throw new MainError('You can not move yourself', 400)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.sourceId, ['root'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.targetId, ['root'])
            return await PixeController.moveUserToPixe(body)
        }, body)
    }

    async addUserFromPixe(userRequest, body = { id, user: { id, role } }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id === body.user.id) throw new MainError('You can not add yourself', 400)
            if (!(['user', 'admin', 'widget'].includes(body.user.role))) {
                throw new MainError('User role must be "user" or "admin" or "widget"', 400)
            }
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            const user = await UserController.getById({ id: body.user.id })
            const pixeUser = { ...body.user }
            if (user.role === 'widget') {
                pixeUser.role = user.role
            }
            const result = await PixeController.addUser({ id: body.id, user: pixeUser })
            if (user.role === 'guest') {
                await UserController.updateRole({ id: body.user.id, role: 'user' })
            }
            return result
        }, body)
    }

    async addUserToPixeAndChildrens(userRequest, body = { id, user: { id, role } }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id === body.user.id) throw new MainError('You can not add yourself', 400)
            if (!(['user', 'admin', 'widget'].includes(body.user.role))) {
                throw new MainError('User role must be "user" or "admin" or "widget"', 400)
            }
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            const user = await UserController.getById({ id: body.user.id }) 
            const pixeUser = { ...body.user }
            if (user.role === 'widget') {
                pixeUser.role = user.role
            }
            const result = await PixeController.addUserToPixeAndChildrens(body)
            if (user.role === 'guest') {
                await UserController.updateRole({ id: body.user.id, role: 'user' })
            }
            return result
        }, body)
    }

    async removeUserFromPixe(userRequest, body = { id, userId }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id === body.userId) throw new MainError('You can not remove yourself', 400)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            return await PixeController.removeUser(body)
        }, body)
    }

    async removeUserFromPixeAndChildrens(userRequest, body = { id, userId }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            if (userRequest.id === body.userId) throw new MainError('You can not remove yourself', 400)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            return await PixeController.removeUserFromPixeAndChildrens(body)
        }, body)
    }

    async hidePixeAndChildrensToOldParent(userRequest, body = { id }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root']) 
            return await PixeController.hidePixeAndChildrensToOldParent(body)
        }, body)
    }

    async hidePixeAndChildrens(userRequest, body = { id }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            return await PixeController.hidePixeAndChildrens(body)
        }, body)
    }
    
    async getCompanies(userRequest) {
        return MainController.handleRequest(async () => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            return await PixeController.getCompanies(userRequest.id)
        })
    }

    async getMapPixesWithMinMaxDepth(userRequest, body = { id, mapDepth, minDepth }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            return await PixeController.getMapWithMinMaxDepth({ ...body, userId: userRequest.id })
        }, body)
    }

    async getMapPixes(userRequest, body = { id }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            return await PixeController.getMap({ ...body, userId: userRequest.id })
        }, body)
    }

    async updateParentFromPixe(userRequest, body = { id, parentId }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            return await PixeController.updateParent(body)
        }, body)
    }

    async updateParentAndChildrensToOldParent(userRequest, body = { id, parentId }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            return await PixeController.updateParentAndChildrensToOldParent(body)
        }, body)
    }

    async updateNamePixe(userRequest, body = { id, name }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user'])
            await MainController.checkUserPermissionsInPixe(userRequest.id, body.id, ['root'])
            return await PixeController.updateName(body)
        }, body)
    }

    async getUsersPixe(userRequest, body = { id }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            const pixe = await PixeController.getById({ ...body, userId: userRequest.id })
            return await Promise.all(pixe.users.map(user => UserController.getById({ id: user.id })))
        }, body)
    }

    async searchWidgetByName(userRequest, body = { name }) {
        return MainController.handleRequest(async (body) => {
            await MainController.validateUserRequest(userRequest)
            await MainController.checkRolePermissions(userRequest.role, ['root', 'user', 'widget'])
            return await UserController.searchWidgetByName(body)
        }, body)
    }
}


export default new MainController()