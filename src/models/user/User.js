import UserSchema from './UserSchema.js'


class User {
    constructor(params = { id, photoUrl, firstName, lastName, patronymic, phone, countryCode, createdAt, updatedAt, role, description: null  }) {
        const user = UserSchema.parse(params)
        this.id = user.id
        this.photoUrl = user.photoUrl
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.patronymic = user.patronymic
        this.phone = user.phone
        this.countryCode = user.countryCode
        this.description = user.description
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
        this.role = user.role
    }

    updateRole(role) {
        this.role = role
        this.updatedAt = new Date()
        UserSchema.parse(this)
    }

    updateInfo({ firstName, lastName, patronymic, photoUrl, description }) {
        if (firstName) {
            this.firstName = firstName
        }
        if (lastName) {
            this.lastName = lastName
        }
        if (patronymic) {
            this.patronymic = patronymic
        }
        if (photoUrl) {
            this.photoUrl = photoUrl
        }
        if (description) {
            this.description = description
        }

        this.updatedAt = new Date()
        UserSchema.parse(this)
    }
}


export default User