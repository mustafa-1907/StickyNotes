import {Note} from '../model/note.model.js'
import mongoose from "mongoose";

export const createNote = async (title, content, userId) => {
    return await Note.create({title: title, content: content, userId: userId});
}

export const updateNote = async (noteId, title, content) => {
    return await Note.findOneAndUpdate({_id: noteId}, {title: title, content: content}, {returnDocument: "after"})

}
// check note owner by note id
export const checkNoteOwner = async (noteId, userId) => {
    return await Note.findOne({_id: noteId, userId: userId})
}

export const replaceNote = async (noteId, userId, title, content) => {
    return await Note.findOneAndReplace(
        {_id: noteId},
        {
            title,
            content,
            userId
        },
        {
            returnDocument: "after"
        }
    );
};

export const replaceNotesTitle = async (userId, title) => {
    return await Note.updateMany(
        {userId},
        {$set: {title}},
    );
};

export const deleteNote = async (noteId) => {
    return await Note.findByIdAndDelete(noteId, {returnDocument: "before"});
};

export const paginateSortNotes = async (userId, skip, limit) => {
    return await Note.find({userId})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);
};

export const getNoteById = async (noteId) => {
    return await Note.findOne({
        _id: noteId
    });
};

export const getNoteByContent = async (content) => {
    return await Note.findOne({content: content})
}

// check note owner by note content
export const checkNoteOwnerByContent = async (content, userId) => {
    return await Note.findOne({content: content, userId: userId})
}

// retrieve all notes selecting title , userId , createdAt and the email from user
export const getAllNotes = async (userId,) => {
    return await Note.find({userId: userId}, {title: 1, userId: 1, createdAt: 1}).populate('userId', {_id: 0, email: 1})
}

export const aggregateNote = async (userId) => {
    return await Note.aggregate([

        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                title: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                user: {
                    name: "$user.name",
                    email: "$user.email"
                }
            }
        }
    ])
}

export const deleteAllNotes = async (userId) => {
    return await Note.deleteMany({userId: userId})
}
