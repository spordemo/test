import { z } from 'zod'


export const UserSchema = z.object({
    id: z.number(),
    role: z.enum([
        'root', 
        'admin', 
        'user',  
        'widget',
        'removed',
    ]),
    widgetId: z.string().nullable().optional(), // относиться только к виджетам
})
export const PixeSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    isHidden: z.boolean(),
    isMain: z.boolean(),
    parentId: z.string().nullable(),
    mainId: z.string().nullable(),
    ownerId: z.number(),
    creatorId: z.number(),
    depth: z.number(),
    description: z.string().default(''),
    users: z.array(UserSchema),
    createdAt: z.date(),
    updatedAt: z.date(),
})


export default { PixeSchema, UserSchema }