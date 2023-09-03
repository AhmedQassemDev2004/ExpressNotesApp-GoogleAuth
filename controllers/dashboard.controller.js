const { default: mongoose } = require("mongoose");
const Note = require("../models/Note")
const index = async (req,res) => {
    let notes = [];
    try {
        notes = await Note.aggregate([
            { $sort: { updatedAt: -1 } },
            { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
            {
              $project: {
                title: { $substr: ["$title", 0, 30] },
                content: { $substr: ["$content", 0, 100] },
              },
            }
        ]);      
    } catch (error) {
        return res.status(500).send(error.message);
    }
    return res.render("dashboard",{
        locals:{
            title:"Dashboard"
        },
        user:req.user,
        notes,
        layout:"../views/layouts/dashboard"
    })
}

const add = (req,res) => {
    return res.render("dashboars-add",{
        locals:{
            title:"Add new note"
        },
        user:req.user,
        errors:{},
        layout:"../views/layouts/dashboard"
    })
}

const storeNote = async (req,res) => {
    const {title,content} = req.body;
    let errors = {};
    if(!title) {
        errors.title = {
            message:"Title field is required"
        }
    }
    else if (!content) {
        errors.content = {
            message:"Content field is reqiuired"
        }
    } 
    else {
        try {
            const note = new Note({title,content,user:req.user._id});
            await note.save();
            res.redirect("/dashboard");
        } catch (error) {
            return res.send("Error happend");
        }
    }

    return res.render("dashboars-add",{
        locals:{
            title:"Add new note"
        },
        user:req.user,
        errors,
        layout:"../views/layouts/dashboard"
    })
}

const getNote = async (req,res) => {
    let note = {};
    try {
        note = await Note.findById(req.params.id);
    } catch (error) {
        return res.status(500).send(error.message);
    }
    return res.render("dashboard-note",{
        locals:{
            title:note.title ? "Note - "+ String(note.title) : "Note not found"
        },
        user:req.user,
        errors:{},
        note,
        layout:"../views/layouts/dashboard"
    })
}


const updateNote = async (req,res)=>{
    let note = {};
    try {
        note = await Note.findByIdAndUpdate(req.params.id,req.body);
    } catch (error) {
        return res.status(500).send(error.message);
    }

    return res.redirect("/dashboard/note/"+note._id);
}

const deleteNote = async (req,res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        return res.redirect("/")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    index,
    add,
    storeNote,
    getNote,
    updateNote,
    deleteNote
}