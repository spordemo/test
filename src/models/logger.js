import fetch from 'node-fetch'


export default async ({ url, project }) => {
    let log = console.log
    console.log = (...args) => {
        log(...args)
        
        if (args.length === 1) return
        send({
            level: 0,
            message: args[0],
            path: args[1]
        })
    }

    let info = console.info
    console.info = (...args) => {
        info(...args)

        if (args.length === 1) return
        send({
            level: 1,
            message: args[0],
        })
    }

    let error = console.error
    console.error = (...args) => {
        error(...args)
        send({
            level: 2,
            message: args[0].message,
            path: args[0].path,
            params: args[0].params
        })
    }

    async function send (data) {
        try {
            const response = await fetch(`${url}/api/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    project,
                })
            }, {
                validateStatus() {
                    return true
                }
            })
            const json = await response.json()
            if (response.status !== 200) throw new Error(json.message || 'Invalid response')
        } catch(e) {
            error(e)
        }
    }
}