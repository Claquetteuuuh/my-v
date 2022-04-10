import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "You need an username"],
        unique: true,
    },
    picture: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Enter an email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Choose a password"],
        minlength: [8, "Your password is too short"]
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)