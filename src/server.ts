import e from "express"
import UsersRouter from "./routes/Users.route.js"
import WalletsRouter from "./routes/Wallets.route.js"
const server = e()
server.use(e.json())
server.use("/users" , UsersRouter)
server.use("/wallets" , WalletsRouter)
server.listen(3000)
