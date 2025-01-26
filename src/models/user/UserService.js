import User from './User.js'
import UserRepository from './UserRepository.js'


class UserService {
    async getNextId() {
        let id = 435809
        try {
            const user = await UserRepository.getLastCreatedUser()
            id = user.id + 1
        } catch{}
        return id
    }

    async createWidget(params = { phone, countryCode, firstName, lastName, patronymic, photoUrl }) {
        const user = new User({
            ...params,
            id: await this.getNextId(),
            role: 'widget',
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return await UserRepository.create(user)
    }

    async create(params = { phone, countryCode, firstName, lastName, patronymic, photoUrl }) {
        const newUser = new User({
            ...params,
            id: await this.getNextId(),
            description: null,
            role: 'guest',
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return await UserRepository.create(newUser)
    }

    async getById(id) {
        return await UserRepository.getById(id)
    }

    async getByIds(ids) {
        return await UserRepository.getByIds(ids)
    }

    async getByPhone(phone) {
        return await UserRepository.getByPhone(phone)
    }

    async updateInfo(id, info) {
        const user = await UserRepository.getById(id)
        user.updateInfo(info)
        return await UserRepository.update(user)
    }

    async updateRole(id, role) {
        const user = await UserRepository.getById(id)
        user.updateRole(role)
        return await UserRepository.update(user)
    }

    async searchWidgetByName(name) {
        return await UserRepository.searchWidgetByName(name)
    }
}


export default new UserService()