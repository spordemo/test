import Pixe from './Pixe.js'
import PixeError from './PixeError.js'
import PixeRepository from './PixeRepository.js'


class PixeService {
    rendomColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    async createChildren(params = { name, creatorId, parentId }) {
        const pixe = await PixeRepository.getById(params.parentId)
        const newPixe = new Pixe({ 
            ...params, 
            id: '0', 
            color: this.rendomColor(),
            isHidden: false, 
            isMain: false,  
            ownerId: pixe.ownerId,
            depth: pixe.depth + 1,
            mainId: pixe.isMain ? pixe.id : pixe.mainId, 
            users: pixe.users.filter((user) => {
                return user.role !== 'widget'
            }),
            createdAt: new Date(), 
            updatedAt: new Date() 
        })
        const result = await PixeRepository.create(newPixe)
        return result.get(params.creatorId)
    }

    async createCompany(params = { name, ownerId }) {
        const { name, ownerId } = params

        const newPixe = new Pixe({  
            id: '0', 
            color: this.rendomColor(),
            isHidden: false, 
            isMain: true, 
            parentId: null, 
            mainId: null, 
            name,
            depth: 0,
            ownerId,
            creatorId: ownerId,
            users: [{ id: ownerId, role: 'root' }],
            createdAt: new Date(), 
            updatedAt: new Date(),
        })
        const result = await PixeRepository.create(newPixe)
        return result.get(ownerId)
    }

    async getCompanies(userId) {
        const pixes = await PixeRepository.getAllVisible()
        if (pixes.length <= 0) return []
        const pixe = pixes[0]
        return pixe.getCompanies(userId, pixes)
    }

    async getMapWithMinMaxDepth(id, minDepth, maxDepth, userId) {
        const pixe = await PixeRepository.getById(id)
        const pixes = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        return pixe.getMapWithMinMaxDepth(minDepth, maxDepth, userId, pixes)
    }

    async getMap(id, userId) {
        const pixe = await PixeRepository.getById(id)
        const result = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        return pixe.getMap(userId, result)
    }

    async getById(id, userId) {
        const result = await PixeRepository.getById(id)
        return result.get(userId)
    }
    
    async hidePixeAndChildrensToOldParent(id) {
        const pixe = await PixeRepository.getById(id)
        const pixes = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        const updatePixes = pixe.hidePixeAndChildrensToOldParent(pixes)
        return await PixeRepository.updateMany(updatePixes)
    }

    async hidePixeAndChildrens(id) {
        const pixe = await PixeRepository.getById(id)
        const pixes = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        const updatePixes = pixe.hidePixeAndChildrens(pixes)
        return await PixeRepository.updateMany(updatePixes)
    }

    async updateUserRole(id, user = { id, role }) {
        const pixe = await PixeRepository.getById(id)
        pixe.updateUserRole(user)
        return await PixeRepository.update(pixe)
    }

    async addUser(id, user) {
        const pixe = await PixeRepository.getById(id)
        const company = await PixeRepository.getById(pixe.isMain ? pixe.id : pixe.mainId)
        pixe.addUser(user)
        company.addUser(user)
        return await PixeRepository.updateMany([pixe, company])
    }

    async removeUser(id, userId) {
        const pixe = await PixeRepository.getById(id)
        let updatePixes = []
        if (pixe.isMain) {
            updatePixes = await this.removeUserFromPixeAndChildrens(id, userId)
        } else {
            pixe.removeUser(userId)
            updatePixes = [pixe]
        }
        return await PixeRepository.updateMany(updatePixes)
    }

    async updateUserRoleInPixeAndChildrens(id, user) {
        const pixe = await PixeRepository.getById(id)
        const pixes = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        const updatePixes = pixe.updateUserRoleInPixeAndChildrens(user, pixes)
        return await PixeRepository.updateMany(updatePixes)
    }

    async addUserToPixeAndChildrens(id, user) {
        const pixe = await PixeRepository.getById(id)
        const pixes = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        const updatePixes = pixe.addUserToPixeAndChildrens(user, pixes)
        return await PixeRepository.updateMany(updatePixes)
    }

    async removeUserFromPixeAndChildrens(id, userId) {
        const pixe = await PixeRepository.getById(id)
        const pixes = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        const updatePixes = pixe.removeUserFromPixeAndChildrens(userId, pixes)
        return await PixeRepository.updateMany(updatePixes)
    }

    async updateParent(id, parentId) {
        const pixe = await PixeRepository.getById(id)
        pixe.updateParent(parentId)
        return await PixeRepository.update(pixe)
    }

    async updateParentAndChildrensToOldParent(id, parentId) {
        const pixe = await PixeRepository.getById(id)
        const pixes = await PixeRepository.getCompanyAndChildrensVisibleById(id)
        const updatePixes = pixe.updateParentAndChildrensToOldParent(parentId, pixes)
        return await PixeRepository.updateMany(updatePixes)
    }

    async updateName(id, name) {
        const pixe = await PixeRepository.getById(id)
        pixe.updateName(name)
        return await PixeRepository.update(pixe)
    }

    async moveUserToPixe(sourceId, targetId, userId) {
        const sourcePixe = await PixeRepository.getById(sourceId)
        if (sourcePixe.isMain) throw new PixeError('You can not move user from company', 400)
        const targetPixe = await PixeRepository.getById(targetId)
        if (sourcePixe.mainId !== targetPixe.mainId) throw new PixeError('You can not move user between companies', 400)
        sourcePixe.moveUser(userId, targetPixe)
        const updatePixes = [sourcePixe, targetPixe]
        return await PixeRepository.updateMany(updatePixes)
    }

    async moveWidgetToPixe(sourceId, targetId, widgetId) {
        const sourcePixe = await PixeRepository.getById(sourceId)
        const targetPixe = await PixeRepository.getById(targetId)
        sourcePixe.moveWidget(widgetId, targetPixe)
        const updatePixes = [sourcePixe, targetPixe]
        return await PixeRepository.updateMany(updatePixes)
    }
}


export default new PixeService()