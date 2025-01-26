import { z } from 'zod'


const UserSchema = z.object({
    id: z.number(),
    photoUrl: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string(),
    phone: z.string(),
    description: z.string().nullable(),
    countryCode: z.enum(['RU', 'UA', 'BY', 'KZ', 'UZ', 'KG', 'TJ', 'TM']),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: z.enum(['root', 'user', 'guest', 'widget']),
})


export default UserSchema