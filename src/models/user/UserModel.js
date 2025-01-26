import { Schema, model } from 'mongoose'


const UserModel = model('user', new Schema({
    id: { type: Number, required: true, unique: true, index: true },
    photoUrl: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patronymic: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    countryCode: { type: String, required: true, enum: ['RU', 'UA', 'BY', 'KZ', 'UZ', 'KG', 'TJ', 'TM'] },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    description: { type: String, default: null },
    role: { type: String, required: true, enum: ['root', 'user', 'guest', 'widget'] },
}, { timestamps: false, versionKey: false }))
UserModel.createIndexes({ firstName: 'text', lastName: 'text', patronymic: 'text' });

export default UserModel