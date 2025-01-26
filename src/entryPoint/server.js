import http from 'http'


export default async ({ port, hostname }, requestListener) => {
    const server = http.createServer(requestListener)

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })

    return server
}