const mongoose = require("mongoose")

const uri = "mongodb+srv://attit11:Thinkpad11@cluster0.ehix2s4.mongodb.net/task-man"

mongoose.connect(uri).then(
    () => { 
        console.log("🚀 Connected to Database!")
     },
    (err) => { 
        console.log(`❌ ${err}`)
     }
  )