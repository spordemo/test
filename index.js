import logger from './src/models/logger.js'
import cron from './src/entryPoint/cron.js'
import mongo from './src/entryPoint/mongo.js'
import socket from './src/entryPoint/socket.js'
import server from './src/entryPoint/server.js'
import express from './src/entryPoint/express.js'


const isProduction = process.env.NODE_ENV === 'production'
const config = {
    mongo: {
        url: isProduction 
        ? 'mongodb://gen_user:dagfAr-ganbaw-6novzu@194.87.143.118:27017/prod?authSource=admin&directConnection=true'
        : 'mongodb+srv://voplik:iiNGMggzaQFbNNo6@cluster0.thl5ceu.mongodb.net/test',
    },
    server: {
        port: isProduction ? 8001 : 8101,
        hostname: 'localhost',
    },
    express: {
        staticRoot: 'public',
    },
    socket: {
        path: '/api/v1/ws/',
        origin: '*'
    },
    logger: {
        url: isProduction ? 'http://localhost:4003' : 'http://localhost:4103',
        project: 'APP',
    },
    cron: {
        time: '0 0 * * *',
        deletionInterval: 1209600000    
    },
}

await logger(config.logger)
await mongo(config.mongo)
await cron(config.cron)
const app = await express(config.express)
const srv = await server(config.server, app)
await socket(config.socket, srv)