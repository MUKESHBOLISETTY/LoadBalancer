import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
const app = express()

const backends = [
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004'
]

let currentBackend = 0

//Round-robin
const balancer = req => {
    const target = backends[currentBackend]
    console.log(`Forwarding request for ${req.url} to: ${target}`)
    currentBackend = (currentBackend + 1) % backends.length

    return target
}

const proxy = createProxyMiddleware({
    target: backends[0],
    router: balancer,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug'
})

app.use('/', proxy)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Load balancer is running on http://localhost:${PORT}`);
})