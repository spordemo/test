import express from 'express'


export default async ({ staticRoot }) => {
    const app = express()
    app.use(express.static(staticRoot)) 
    app.get('/*', async (req, res, next) => {
        try {
            req.url = '/'
            express.static('public')(req, res, next)
        } catch(e) {
            e.path = '/src/entryPoint/express/get'
            console.error(e)
            res.status(500).json({ message: 'Что-то пошло не так!' })
        }
    })
    console.log('Express server initialized')
    return (req, res) => {
        app(req, res)
    }
}