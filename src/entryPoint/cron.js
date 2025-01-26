import { CronJob } from 'cron'
import PixeRepository from '../models/pixe/PixeRepository.js'


export default async ({ time, deletionInterval }) => {
    const fn = async () => {
        const pixes = await PixeRepository.getAllHidden()
        const deletionTime = Date.now() - deletionInterval
        const pixesForDeletion = pixes.filter((pixe) => {
            return deletionTime > pixe.updatedAt.getTime()
        })
        if (pixesForDeletion.length > 0) {
            await PixeRepository.deleteMany(pixesForDeletion)
        }
    }
    const job = new CronJob(time, async () => {
        try {
            await fn()
        } catch(e) {
            e.path = '/src/entryPoint/cron/job'
            console.error(e)
        }
    })
    job.start()
}