import {model, Schema} from 'mongoose'

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: function (value) {
            return value !== value.toUpperCase();
        },
        lowercase : true
    },
    content: {
        type: String,
        required: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
})

export const Note = model('Note', noteSchema)