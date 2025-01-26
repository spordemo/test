import { connect } from 'mongoose'


export default async ({ url }) => {
    await connect(url)
    console.log('Connected to MongoDB')
}