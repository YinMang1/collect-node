const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    if(req.url.startsWith('/favicon.ico')) {
        res.end()
        return
    }
    const urlObj = url.parse(req.url)
    const pathname = urlObj.pathname
    if (pathname.startsWith('/api')) {
        res.setHeader('Content-Type', 'application/json')
        res.end([{ data: '12321' }, { haha: 321 }])
    } else {
        const extName = path.extname(pathname)
        const a = pathname.substr(1)
        fs.readFile(a,(err,data) => {
            res.setHeader('Content-Type', 'image/jpg');
            res.write(data)
            res.end()
        })
    }
})

server.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`)
})