const express = require("express")
require("./database/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`🚀 Server is running on PORT ${PORT}`)
})