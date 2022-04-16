import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,    
    },
    content:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema)