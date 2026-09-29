import {model, Schema} from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
        min: 18,
        max: 60,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const User = model('User', UserSchema)