import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    cloudflareId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    channelId:{
        type: String,
        required: true
    },
    miniature: {
        type: String,
    } ,
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    likes: {
        type: Array,
        required: true,
    },
    views: {
        type: Array,
        required: true,
    },
    keywords: {
        type: Array
    }

})

module.exports = mongoose.models.Video || mongoose.model('Video', videoSchema)