import { Schema, model } from 'mongoose'


const PixeModel = model('pixe', new Schema({
    name: { type: String, required: true },
    ownerId: { type: Number, required: true },
    creatorId: { type: Number, required: true },
    color: { type: String, required: true },
    parentId: { type: String, default: null },        
    mainId: { type: String, default: null },
    isMain: { type: Boolean, require: true },
    isHidden: { type: Boolean, require: true },
    users: [{
        id: { type: Number, required: true },
        role: { type: String, required: true, 
            enum: [        
                'root', 
                'admin', 
                'user',  
                'widget',
                'removed',
            ] 
        },
        widgetId: { type: String, default: null }
    }],
    description: { type: String, default: '' },
    depth: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
}, { timestamps: false, versionKey: false }))


export default PixeModel