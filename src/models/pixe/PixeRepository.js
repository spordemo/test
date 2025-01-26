import Pixe from './Pixe.js'
import mongoose from 'mongoose'
import PixeModel from './PixeModel.js'
import PixeError from './PixeError.js'


class PixeRepository {
    async getById(id) {
        const pixeData = await PixeModel.findById(id).lean()
        if (!pixeData) throw new PixeError('Pixe not found', 404)
        return new Pixe({
            ...pixeData,
            id: pixeData._id.toString(),
        });
    }
    
    async create(pixe) {
        const newPixe = await PixeModel.create(pixe)
        return new Pixe({
            ...pixe,
            id: newPixe._id.toString(),
        })
    }

    async update(pixe) {
        const updatedPixe = await PixeModel.findByIdAndUpdate(pixe.id, pixe, { new: true }).lean();
        if (!updatedPixe) throw new PixeError('Pixe not found', 404)
        return new Pixe({
            ...updatedPixe,
            id: updatedPixe._id.toString(),
        });
    }
    
    async updateMany(pixes) {
        let session
        try {
            session = await mongoose.startSession()
            session.startTransaction()
            const bulkOps = pixes.map(pixe => ({
                updateOne: {
                    filter: { _id: pixe.id },
                    update: pixe,
                    upsert: true,
                }
            }))
            const result = await PixeModel.bulkWrite(bulkOps, { session })
            if (result.modifiedCount + result.upsertedCount !== pixes.length) throw new PixeError('Pixes not found', 404)
            await session.commitTransaction()
            return pixes
        } catch(err) {
            try {
                session && await session.abortTransaction()
            } catch(err) {
                e.path = 'PixeRepository.updateMany'
                console.error(err)
            }
            throw err
        } finally {
            session && session.endSession()
        }
    }

    async getCompanyAndChildrensVisibleById(id) {
        const pixe = await this.getById(id)
        const mainPixe = await this.getById(pixe.isMain ? id : pixe.mainId)
        const pixesData = await PixeModel.find({ mainId: mainPixe.id, isHidden: false }).lean()
        const result = pixesData.map(pixeData => new Pixe({
            ...pixeData,
            id: pixeData._id.toString(),
        }))
        result.push(mainPixe)
        return result
    }

    async getAllHidden() {
        const pixesData = await PixeModel.find({ isHidden: true }).lean()
        return pixesData.map(pixeData => new Pixe({
            ...pixeData,
            id: pixeData._id.toString(),
        }))
    }

    async getAllVisible() {
        const pixesData = await PixeModel.find({ isHidden: false }).lean()
        return pixesData.map(pixeData => new Pixe({
            ...pixeData,
            id: pixeData._id.toString(),
        }))
    }

    async deleteMany(pixes) {
        let session 
        try {
            session = await mongoose.startSession()
            session.startTransaction()
            const ids = pixes.map(pixe => pixe.id)
            const result = await PixeModel.deleteMany({ _id: { $in: ids } }, { session })
            await session.commitTransaction()
            return result.deletedCount
        } catch(err) {
            try {
                session && await session.abortTransaction()
            } catch(err) {
                e.path = 'PixeRepository.deleteMany'
                console.error(err)
            }
            throw err
        }
    }
}

export default new PixeRepository()