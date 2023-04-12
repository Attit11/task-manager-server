const mongoose = require("mongoose")

const uri = 'mongodb://127.0.0.1:27017/task-man'

mongoose.connect(uri).then(
    () => { 
        console.log("🚀 Connected to Database!")
     },
    (err) => { 
        console.log(`❌ ${{err}}`)
     }
  )