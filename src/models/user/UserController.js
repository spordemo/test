import UserError from './UserError.js'
import UserService from './UserService.js'


class UserController {
    // Получение пользователя по номеру телефона
    async getByPhone(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { phone } = body
        if (typeof phone !== 'string') throw new UserError('Phone must be a string', 400)
        return await UserService.getByPhone(phone)
    }

    // Получение пользователя по id
    async getById(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { id } = body
        if (typeof id !== 'number') throw new UserError('Id must be a number', 400)
        if (Number.isNaN(id)) throw new UserError('Id must be a number', 400)
        return await UserService.getById(id)
    }

    // Получение пользователей по id
    async getByIds(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { ids } = body
        if (!Array.isArray(ids)) throw new UserError('Ids must be an array', 400)
        if (!ids.every(id => typeof id === 'number' && !Number.isNaN(id))) throw new UserError('Ids must be an array of numbers', 400)
        return await UserService.getByIds(ids)
    }

    // Создание виджета
    async createWidget(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { phone, countryCode, firstName, lastName, patronymic, photoUrl, description } = body
        if (typeof phone !== 'string') throw new UserError('Phone must be a string', 400)
        if (typeof description !== 'string') throw new UserError('Description must be a string', 400)
        if (!phone.startsWith('0')) throw new UserError('Phone must start with 0', 400)
        if (typeof countryCode !== 'string') throw new UserError('Country code must be a string', 400)
        if (typeof firstName !== 'string') throw new UserError('First name must be a string', 400)
        if (typeof lastName !== 'string') throw new UserError('Last name must be a string', 400)
        if (typeof patronymic !== 'string') throw new UserError('Patronymic must be a string', 400)
        if (typeof photoUrl !== 'string') throw new UserError('Photo URL must be a string', 400)
        return await UserService.createWidget(body)
    }

    // Создание пользователя
    async create(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { countryCode, firstName, lastName, patronymic, phone, photoUrl } = body
        if (typeof phone !== 'string') throw new UserError('Phone must be a string', 400)
        if (phone.startsWith('0')) throw new UserError('Phone must not start with 0', 400)
        if (typeof countryCode !== 'string') throw new UserError('Country code must be a string', 400)
        if (typeof firstName !== 'string') throw new UserError('First name must be a string', 400)
        if (typeof lastName !== 'string') throw new UserError('Last name must be a string', 400)
        if (typeof patronymic !== 'string') throw new UserError('Patronymic must be a string', 400)
        if (typeof photoUrl !== 'string') throw new UserError('Photo URL must be a string', 400)
        return await UserService.create(body)
    }

    // Обновление информации о пользователе
    async updateInfo(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { id, info } = body
        if (typeof id !== 'number') throw new UserError('Id must be a number', 400)
        if (Number.isNaN(id)) throw new UserError('Id must be a number', 400)
        if (!(info instanceof Object)) throw new UserError('Info must be an object', 400)            
        return await UserService.updateInfo(id, info)
    }

    // Обновление роли пользователя
    async updateRole(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { id, role } = body
        if (typeof id !== 'number') throw new UserError('Id must be a number', 400)
        if (Number.isNaN(id)) throw new UserError('Id must be a number', 400)
        if (typeof role !== 'string') throw new UserError('Role must be a string', 400)
        return await UserService.updateRole(id, role)
    }

    // Поиск виджета по имени
    async searchWidgetByName(body) {
        if (!(body instanceof Object)) throw new UserError('Body must be an object', 400)
        const { name } = body
        if (typeof name !== 'string') throw new UserError('Name must be a string', 400)
        return await UserService.searchWidgetByName(name)
    }
}


export default new UserController()