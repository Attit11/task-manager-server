const express = require("express")
var cors = require('cors')
require("./database/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`🚀 Server is running on PORT ${PORT}`)
})