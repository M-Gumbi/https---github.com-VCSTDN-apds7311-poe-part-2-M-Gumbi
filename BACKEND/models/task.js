const mongoose = require('mongoose')

const Task = mongoose.Schema({
    task: {type:String, required:true},
    branch: {type:String,required:true},
    department: {type:String,required:true}
})

module.exports = mongoose.model('GovernmentTask', Task)