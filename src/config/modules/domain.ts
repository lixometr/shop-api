let protocol = process.env.PROTOCOL
let host = process.env.HOST
let port = process.env.PORT
let baseUrl = `${protocol}${host}`
if (process.env.NODE_ENV !== 'production') {
    baseUrl = `${protocol}://${host}:${port}`
}

export default {
    host,
    protocol,
    baseUrl
}