import PixeError from './PixeError.js'
import PixeService from './PixeService.js'


class PixeController {
    async createChildren(body = { name, parentId, creatorId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { name, parentId, creatorId } = body
        if (typeof name !== 'string') throw new PixeError('Name must be a string', 400)
        if (typeof parentId !== 'string') throw new PixeError('ParentId must be a string', 400)
        if (typeof creatorId !== 'number') throw new PixeError('CreatorId must be a number', 400)
        if (Number.isNaN(creatorId)) throw new PixeError('CreatorId must be a number', 400)
        return await PixeService.createChildren({
            ...body,
            creatorId
        })
    }

    async moveWidgetToPixe(body = { sourceId, targetId, widgetId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { sourceId, targetId, widgetId } = body
        if (typeof sourceId !== 'string') throw new PixeError('SourceId must be a string', 400)
        if (typeof targetId !== 'string') throw new PixeError('TargetId must be a string', 400)
        if (typeof widgetId !== 'string') throw new PixeError('WidgetId must be a string', 400)
        if (sourceId === targetId) throw new PixeError('SourceId and TargetId must be different', 400)
        return await PixeService.moveWidgetToPixe(sourceId, targetId, widgetId)
    }

    async moveUserToPixe(body = { sourceId, targetId, userId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { sourceId, targetId, userId } = body
        if (typeof sourceId !== 'string') throw new PixeError('SourceId must be a string', 400)
        if (typeof targetId !== 'string') throw new PixeError('TargetId must be a string', 400)
        if (typeof userId !== 'number') throw new PixeError('UserId must be a number', 400)
        if (Number.isNaN(userId)) throw new PixeError('UserId must be a number', 400)
        if (sourceId === targetId) throw new PixeError('SourceId and TargetId must be different', 400)
        return await PixeService.moveUserToPixe(sourceId, targetId, userId)
    }

    async createCompany(body = { name, ownerId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { name, ownerId } = body
        if (typeof name !== 'string') throw new PixeError('Name must be a string', 400)
        if (typeof ownerId !== 'number') throw new PixeError('OwnerId must be a number', 400)
        if (Number.isNaN(ownerId)) throw new PixeError('OwnerId must be a number', 400)
        return await PixeService.createCompany(body)
    }

    async updateUserRole(body = { id, user }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, user } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)  
        if (typeof user !== 'object') throw new PixeError('User must be an object', 400)
        if (typeof user.id !== 'number') throw new PixeError('User id must be a number', 400)
        if (Number.isNaN(user.id)) throw new PixeError('User id must be a number', 400)
        if (typeof user.role !== 'string') throw new PixeError('User role must be a string', 400)
        return await PixeService.updateUserRole(id, user)
    }

    async addUser(body = { id, user: { id, role } }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, user } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)  
        if (typeof user !== 'object') throw new PixeError('User must be an object', 400)
        if (typeof user.id !== 'number') throw new PixeError('User id must be a number', 400)
        if (Number.isNaN(user.id)) throw new PixeError('User id must be a number', 400)
        if (typeof user.role !== 'string') throw new PixeError('User role must be a string', 400)
        if (user.role === 'root') throw new PixeError('You can not add root role', 400)
        return await PixeService.addUser(id, user)
    }

    async updateUserRoleInPixeAndChildrens(body = { id, user }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, user } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof user !== 'object') throw new PixeError('User must be an object', 400)
        if (typeof user.id !== 'number') throw new PixeError('User id must be a number', 400)
        if (Number.isNaN(user.id)) throw new PixeError('User id must be a number', 400)
        if (typeof user.role !== 'string') throw new PixeError('User role must be a string', 400)
        return await PixeService.updateUserRoleInPixeAndChildrens(id, user)
    }

    async addUserToPixeAndChildrens(body = { id, user }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, user } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof user !== 'object') throw new PixeError('User must be an object', 400)
        if (typeof user.id !== 'number') throw new PixeError('User id must be a number', 400)
        if (Number.isNaN(user.id)) throw new PixeError('User id must be a number', 400)
        if (typeof user.role !== 'string') throw new PixeError('User role must be a string', 400)
        if (user.role === 'root') throw new PixeError('You can not add root role', 400)
        return await PixeService.addUserToPixeAndChildrens(id, user)
    }
    
    async removeUser(body = { id, userId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, userId } = body
        if (typeof userId !== 'number') throw new PixeError('UserId must be a number', 400)
        if (Number.isNaN(userId)) throw new PixeError('UserId must be a number', 400)
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        return await PixeService.removeUser(id, userId)
    }

    async removeUserFromPixeAndChildrens(body = { id, userId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, userId } = body
        if (typeof userId !== 'number') throw new PixeError('UserId must be a number', 400)
        if (Number.isNaN(userId)) throw new PixeError('UserId must be a number', 400)
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        return await PixeService.removeUserFromPixeAndChildrens(id, userId)
    }

    async hidePixeAndChildrensToOldParent(body = { id }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        return await PixeService.hidePixeAndChildrensToOldParent(id)
    }

    async hidePixeAndChildrens(body = { id }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        return await PixeService.hidePixeAndChildrens(id)
    }
    
    async getCompanies(userId) {
        if (typeof userId !== 'number') throw new PixeError('User id must be a number', 400)
        if (Number.isNaN(userId)) throw new PixeError('User id must be a number', 400)
        return await PixeService.getCompanies(userId)
    }

    async getMapWithMinMaxDepth(body = { id, minDepth, maxDepth, userId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, minDepth, maxDepth, userId } = body
        if (typeof userId !== 'number') throw new PixeError('UserId must be a number', 400)
        if (Number.isNaN(userId)) throw new PixeError('UserId must be a number', 400)
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof minDepth !== 'number') throw new PixeError('MinDepth must be a number', 400)
        if (Number.isNaN(minDepth)) throw new PixeError('MinDepth must be a number', 400)
        if (typeof maxDepth !== 'number') throw new PixeError('MaxDepth must be a number', 400)
        if (Number.isNaN(maxDepth)) throw new PixeError('MaxDepth must be a number', 400)
        return await PixeService.getMapWithMinMaxDepth(id, minDepth, maxDepth, userId)
    }

    async getMap(body = { id, userId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, userId } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof userId !== 'number') throw new PixeError('UserId must be a number', 400)
        if (Number.isNaN(userId)) throw new PixeError('UserId must be a number', 400)
        return await PixeService.getMap(id, userId)
    }

    async updateParent(body = { id, parentId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, parentId } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof parentId !== 'string') throw new PixeError('ParentId must be a string', 400)
        if (id === parentId) throw new PixeError('Id and parentId must be different', 400)
        return await PixeService.updateParent(id, parentId)
    }

    async updateParentAndChildrensToOldParent(body = { id, parentId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, parentId } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof parentId !== 'string') throw new PixeError('ParentId must be a string', 400)
        return await PixeService.updateParentAndChildrensToOldParent(id, parentId)
    }

    async updateName(body = { id, name }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, name } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof name !== 'string') throw new PixeError('Name must be a string', 400)
        return await PixeService.updateName(id, name)
    }

    async getById(body = { id, userId }) {
        if (!(body instanceof Object)) throw new PixeError('Body must be an object', 400)
        const { id, userId } = body
        if (typeof id !== 'string') throw new PixeError('Id must be a string', 400)
        if (typeof userId !== 'number') throw new PixeError('UserId must be a number', 400)
        if (Number.isNaN(userId)) throw new PixeError('UserId must be a number', 400)
        return await PixeService.getById(id, userId)
    }
}


export default new PixeController()