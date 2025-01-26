import User from './User.js'
import UserModel from './UserModel.js'
import UserError from './UserError.js'


class UserRepository {
    async searchWidgetByName(name) {
        const usersData = await UserModel.find({ $text: { $search: name }, role: 'widget' }).lean()
        return usersData.map(userData => new User({
            ...userData,
            id: userData.id,
        }))
    }

    async getById(id) {
        const userData = await UserModel.findOne({ id }).lean()
        if (!userData) throw new UserError('User not found', 404)
        return new User({
            ...userData,
            id: userData.id,
        })
    }

    async getByPhone(phone) {
        const userData = await UserModel.findOne({ phone }).lean()
        if (!userData) throw new UserError('User not found', 404)
        return new User({
            ...userData,
            id: userData.id,
        })
    }

    async getByIds(ids) {
        const usersData = await UserModel.find({ id: { $in: ids } }).lean()
        return usersData.map(userData => new User({
            ...userData,
            id: userData.id,
        }))
    }

    async create(user) {
        try {
            const newUser = await UserModel.create(user)
            return new User({
                ...user,
                id: newUser.id,
            })
        } catch(e) {
            if (e.code === 11000) throw new UserError('User with the same phone already exists', 400)
            throw e
        }
    }

    async update(user) {
        const updatedUser = await UserModel.findOneAndUpdate({ id: user.id }, user, { new: true }).lean()
        if (!updatedUser) throw new UserError('User not found', 404)
        return new User({
            ...updatedUser,
            id: updatedUser.id,
        })
    }
    
    async updateMany(users) {
        const bulkOps = users.map(user => ({
            updateOne: {
                filter: { id: user.id },
                update: user,
                upsert: true,
            }
        }))
        const result = await UserModel.bulkWrite(bulkOps)
        if (result.modifiedCount + result.upsertedCount !== users.length) throw new UserError('Users not found', 403)
        return users
    }

    async getAll() {
        const usersData = await UserModel.find().lean()
        return usersData.map(userData => new User({
            ...userData,
            id: userData.id,
        }))
    }

    async getLastCreatedUser() {
        const userData = await UserModel.findOne().sort({ createdAt: -1 }).lean()
        if (!userData) throw new UserError('No users found', 404)
        return new User({
            ...userData,
            id: userData.id,
        })
    }
}


export default new UserRepository()