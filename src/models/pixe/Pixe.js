import { Types } from 'mongoose'
import { PixeSchema, UserSchema } from './PixeSchema.js'
import PixeError from './PixeError.js'


class Pixe {
    constructor(params = { id, name, ownerId, creatorId, color, parentId, mainId, users, isHidden, isMain, updatedAt, createdAt, depth, description }) {
        const pixe = PixeSchema.parse(params)
        this.id = pixe.id
        this.name = pixe.name
        this.ownerId = pixe.ownerId
        this.creatorId = pixe.creatorId
        this.color = pixe.color
        this.parentId = pixe.parentId
        this.mainId = pixe.mainId
        this.users = pixe.users
        this.isHidden = pixe.isHidden
        this.isMain = pixe.isMain
        this.description = pixe.description
        this.depth = pixe.depth
        this.updatedAt = pixe.updatedAt
        this.createdAt = pixe.createdAt
    }

    get(userId) {
        const user = this.users.find(u => u.id === userId)
        if (!user || user.role === 'removed') {
            return {
                id: this.id,
                parentId: this.parentId,
                mainId: this.mainId,
                isMain: this.isMain,
                createdAt: null,
                updatedAt: null,
                name: '*Неизвестно*',
                color: null,
                ownerId: null,
                creatorId: null,
                depth: null,
                description: null,
                isHidden: null,
                users: [],
            }
        }
        return PixeSchema.parse(this)
    }
    getCompanies(userId, pixes) {
        return pixes
        .filter((pixe) => {
            return pixe.isMain && pixe.users.findIndex((u) => u.id === userId) !== -1
        })
        .map(pixe => {
            return pixe.get(userId)
        })
    }

    getMapWithMinMaxDepth(minDepth, maxDepth, userId, companyPixes) {
        if (minDepth > maxDepth) throw new PixeError('MinDepth must be less than or equal to MaxDepth', 400)
        const result = []
        companyPixes.forEach(pixe => {
            if (this.depth >= minDepth && this.depth <= maxDepth) {
                result.push(pixe)
            }
        })

        return result.map(pixe => {
            return pixe.get(userId)
        })
    }

    getMap(userId, companyPixes) {
        return companyPixes.map(pixe => {
            return pixe.get(userId)
        })
    }

    moveWidget(widgetId, targetPixe) {
        const widget = this.users.find(u => u.widgetId === widgetId && u.role === 'widget')
        if (!widget) return
        this.users = this.users.filter(u => u.widgetId !== widgetId)
        targetPixe.addUser(widget)
    }

    moveUser(userId, targetPixe) {
        const user = this.users.find(u => u.id === userId && u.role !== 'widget')
        if (!user) return
        this.removeUser(userId)
        targetPixe.addUser(user)
    }

    getUserWithHighestIdAndRoleWidget() {
        return this.users
            .filter(user => user.role === 'widget')
            .reduce((maxUser, currentUser) => {
                return (maxUser === null || currentUser.id > maxUser.id) ? currentUser : maxUser;
            }, null);
    }

    updateName(name) {
        this.name = name
        this.updatedAt = new Date()
    }

    updateUserRole(user = { id, role }) {
        UserSchema.parse(user)
        if (user.role === 'widget') return
        this.users.map((u) => {
            if (u.id !== user.id) return
            if (u.role === 'widget') return
            u.role = user.role
            this.updatedAt = new Date()
        })
    }

    addUser(user = { id, role }) {
        const originUser = UserSchema.parse(user)
        const index = this.users.findIndex(u => u.id === originUser.id)
        // если в компании существует виджет, то мы его не добавляем
        if (this.isMain && index !== -1 && originUser.role === 'widget') return
        if (index === -1) {
            if (originUser.role === 'widget' && !this.isMain) {
                originUser.widgetId = new Types.ObjectId().toString()
            }
            this.users.push(originUser)
        } else if (this.users[index].role === 'removed') {
            this.users[index].role = 'user'
        } else {
            return
        }
        this.updatedAt = new Date()
    }

    updateUserRoleInPixeAndChildrens(user, companyPixes) {
        const stack = []
        const updateChildrens = []

        do {
            const currentPixe = stack.pop() || this
            currentPixe.updateUserRole(user)
            updateChildrens.push(currentPixe)
            const childrens = companyPixes.filter(pixe => pixe.parentId === currentPixe.id)
            stack.push(...childrens)
        } while (stack.length > 0)

        const company = companyPixes.find(pixe => pixe.id === this.mainId)
        if (company) {
            company.updateUserRole(user)
            updateChildrens.push(company)
        }
        return updateChildrens
    }

    addUserToPixeAndChildrens(user, companyPixes) {
        const stack = []
        const updateChildrens = []

        do {
            const currentPixe = stack.pop() || this
            currentPixe.addUser(user)
            updateChildrens.push(currentPixe)
            const childrens = companyPixes.filter(pixe => pixe.parentId === currentPixe.id)
            stack.push(...childrens)
        } while (stack.length > 0)

        const company = companyPixes.find(pixe => pixe.id === this.mainId)
        if (company) {
            company.addUser(user)
            updateChildrens.push(company)
        }
        return updateChildrens
    }

    removeUser(id) {
        this.users = this.users
        .filter((u) => {
            if (u.id === id) {
                if (u.role === 'widget') {
                    return false
                }
            }
            return true
        })
        .map((u) => {
            if (u.id === id && u.role !== 'root') {
                u.role = 'removed'
            }
            return u
        })

        this.updatedAt = new Date()
    }

    removeUserFromPixeAndChildrens(id, companyPixes) {
        const stack = []
        const updateChildrens = []
        do {
            const currentPixe = stack.pop() || this
            currentPixe.removeUser(id)
            updateChildrens.push(currentPixe)
            const childrens = companyPixes.filter(pixe => pixe.parentId === currentPixe.id)
            stack.push(...childrens)
        } while (stack.length > 0)
        return updateChildrens
    }

    hide() {
        this.isHidden = true
        this.users = []
        this.updatedAt = new Date()
    }

    hidePixeAndChildrensToOldParent(companyPixes) {
        if (this.isMain) {
            return this.hidePixeAndChildrens(companyPixes)
        }
        this.hide()
        const childrens = companyPixes.filter((pixe) => {
            return pixe.parentId === this.id
        })
        childrens.forEach((pixe) => {
            pixe.updateDepth(this.depth)
            pixe.updateParent(this.parentId)
        })
        return [this, ...childrens]
    }

    hidePixeAndChildrens(companyPixes) {
        const stack = []
        const updatePixes = []
        do {
            const currentPixe = stack.pop() || this
            currentPixe.hide()
            updatePixes.push(currentPixe)
            const childrens = companyPixes.filter(pixe => pixe.parentId === currentPixe.id)
            stack.push(...childrens)
        } while (stack.length > 0)

        return updatePixes
    }

    updateParent(parentId) {
        this.parentId = parentId
        this.updatedAt = new Date()
    }

    updateDepth(depth) {
        this.depth = depth
        this.updatedAt = new Date()
    }

    updateParentAndChildrensToOldParent(parentId, companyPixes) {
        const oldParentId = this.parentId
        this.updateParent(parentId)
        const childrens = companyPixes.filter((pixe) => {
            if (parentId === pixe.id) {
                this.updateDepth(pixe.depth + 1)
            }
            return pixe.parentId === this.id
        })
        childrens.forEach((pixe) => {
            pixe.updateDepth(this.depth)
            pixe.updateParent(oldParentId)
        })
        const updatePixes = [this, ...childrens]
        return updatePixes
    }
}


export default Pixe


