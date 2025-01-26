import { Server } from 'socket.io'
import MainController from '../models/MainController.js'


export default async ({ path, origin }, server) => {
    const wss = new Server(server, {
        path,
        cors: {
            origin,
        }
    })

    wss.use(async (socket, next) => {
        const phone = socket.request.headers['x-user-phone']
        if (!phone) {
            next(new Error('Phone is required'))
            return
        }
        const { status, error, data } = await MainController.getUserByPhone({ id: 0, role: 'root' }, { phone })
        let user = null
        if (status === 404) {
            let result = null
            if (phone.startsWith('0')) {
                result = await MainController.createWidget({ id: 0, role: 'root' }, { 
                    phone,
                    firstName: 'Widget',
                    lastName: 'Widget',
                    patronymic: 'Widget',
                    countryCode: 'RU',
                    description: 'Test Widget',
                    photoUrl: 'https://mypixe.ru/',
                })
            } else {
                result = await MainController.createUser({ id: 0, role: 'root' }, { 
                    phone,
                    firstName: 'User',
                    lastName: 'User',
                    patronymic: 'User',
                    countryCode: 'RU',
                    photoUrl: 'https://mypixe.ru/',
                })
            }
            if (result.status === 200) {
                user = result.data
            } else {
                next(new Error(result.error))
                return
            }
        }
        if (status === 200) {
            user = data
        }
        if (user) {
            socket.data.user = user
            next()
        } else {
            next(new Error(error))
        }
    })

    wss.on('connection', async (socket) => {
        let userRequest = socket.data.user

        socket.on('getCompanies', async (data, next) => {
            if (!(next instanceof Function)) return

            const [currentPixe, companies] = await Promise.all([
                MainController.getPixeById(userRequest, data),
                MainController.getCompanies(userRequest)
            ])

            const result = {
                user: userRequest,
                currentPixe: currentPixe.data,
                companies: await Promise.all(!companies.data ? [] : companies.data.map(async (company) => {
                    const [users, map] = await Promise.all([
                        MainController.getUsersByIds(userRequest, { ids: company.users.map(user => user.id) }),
                        MainController.getMapPixes(userRequest, { id: company.id })
                    ])
                    return {
                        company,
                        users: users.data ?? [],
                        map: map.data ?? []
                    };
                }))
            }
            next(result)
        })  
        socket.on('getUserById', async (data, next) => {
            if (!(next instanceof Function)) return

            const user = await MainController.getUserById(userRequest, data)
            next(user.data)
        })
        socket.on('addUserFromPixe', async (data) => {
            const result = await MainController.addUserFromPixe(userRequest, data)
            if (!result.data) return
            socket.emit('updatePixes', result.data)
            const user = await MainController.getUserById(userRequest, { id: data.user.id })
            if (!user.data) return
            socket.emit('newUserCompany', user.data)
        })
        socket.on('removeUserFromPixe', async (data) => {
            const result = await MainController.removeUserFromPixe(userRequest, data)
            if (!result.data) return
            socket.emit('updatePixes', result.data)
        })
        socket.on('createCompany', async (data) => {
            const company = await MainController.createCompany(userRequest, data)
            const result = {
                company: company.data,
                users: [userRequest],
                map: [company.data] ?? []
            }
            socket.emit('newCompany', result)
        })
        socket.on('updateUserRoleFromPixe', async (data) => {
            const result = await MainController.updateUserRoleFromPixe(userRequest, data)
            if (!result.data) return
            socket.emit('updatePixes', [result.data])
        })
        socket.on('createChildren', async (data) => {
            const children = await MainController.createChildren(userRequest, data)
            if (!children.data) return
            socket.emit('newChildren', children.data)
        })
        socket.on('hidePixeAndChildrensToOldParent', async (data) => {
            const result = await MainController.hidePixeAndChildrensToOldParent(userRequest, data)
            if (!result.data) return
            socket.emit('hidePixes', result.data)
        })
        socket.on('hidePixeAndChildrens', async (data) => {
            const result = await MainController.hidePixeAndChildrens(userRequest, data)
            if (!result.data) return
            socket.emit('hidePixes', result.data)
        })
        socket.on('updateNamePixe', async (data) => {
            const result = await MainController.updateNamePixe(userRequest, data)
            if (!result.data) return
            socket.emit('updatePixes', [result.data])
        })
    })

    console.log('WebSocket server initialized')
}