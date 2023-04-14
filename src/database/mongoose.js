const mongoose = require("mongoose")

const uri = "mongodb+srv://attit11:attit@task-manager-cluster.1b1v70k.mongodb.net/task-man"

mongoose.connect(uri).then(
    () => { 
        console.log("🚀 Connected to Database!")
     },
    (err) => { 
        console.log(`❌ ${err}`)
     }
  )