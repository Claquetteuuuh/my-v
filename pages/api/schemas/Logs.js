import mongoose from 'mongoose'

const logsSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.models.Logs || mongoose.model('Logs', logsSchema)