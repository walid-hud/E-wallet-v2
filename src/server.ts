import e from "express"
const server = e()
server.use(e.json())
server.listen(3000)
