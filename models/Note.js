const mongoose = require("mongoose");
const User = require("./User");

const NoteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:User
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Note",NoteSchema)