import * as noteRepository from '../repository/note.repo.js'
import jwt from "jsonwebtoken";
import {userNotLoggedIn} from "../../user/user.errors.js";
import {AppError} from "../../../common/error/error.js";
import mongoose from "mongoose";
import {checkNoteOwnerByContent} from "../repository/note.repo.js";
import {verifyToken} from "../../auth/utils/token.js";
import {inValidNoteId, notOwner} from "../notes.errors.js";

export const createNote = async (token, id, title, content) => {
    if (!token) throw userNotLoggedIn;
    const verifyTokenResult = await verifyToken(token);
    // if not throw error
    if (verifyTokenResult.id !== id) throw userNotLoggedIn;

    return noteRepository.createNote(title, content, id);
}

export const updateNote = async (token, noteId, title, content) => {
    if (!token) throw userNotLoggedIn;
    console.log(noteId)
    if (!mongoose.Types.ObjectId.isValid(noteId)) throw inValidNoteId

    // console.log(token)
    const verifyTokenResult = await verifyToken(token);

    const userId = verifyTokenResult.id;


    console.log(userId, noteId)

    const noteOwner = await noteRepository.checkNoteOwner(noteId, userId);
    if (!noteOwner) throw notOwner;

    return noteRepository.updateNote(noteId, title, content);

}

export const replaceNote = async (token, noteId, title, content) => {
    if (!token) throw userNotLoggedIn;
    if (!mongoose.Types.ObjectId.isValid(noteId)) throw inValidNoteId;

    const verifyTokenResult = await verifyToken(token);
    const userId = verifyTokenResult.id;

    const noteOwner = await noteRepository.checkNoteOwner(noteId, userId);
    console.log(userId, noteId)
    if (!noteOwner) throw notOwner;
    return noteRepository.replaceNote(noteId, userId, title, content);
}


export const replaceNotesTitle = async (token, userId, title) => {
    if (!token) throw userNotLoggedIn;

    const verifyTokenResult = await verifyToken(token);
    const tokenId = verifyTokenResult.id;

    console.log('userId : ', userId);

    if (tokenId !== userId) throw notOwner;
    const effectedData = await noteRepository.replaceNotesTitle(userId, title);
    console.log(effectedData)
    return effectedData.modifiedCount;
}

export const deleteNote = async (token, noteId) => {
    if (!token) throw userNotLoggedIn;

    const verifyTokenResult = await verifyToken(token);
    const userId = verifyTokenResult.id;


    const noteOwner = await noteRepository.checkNoteOwner(noteId, userId);

    console.log(userId, noteId)
    if (!noteOwner) throw notOwner;

    return await noteRepository.deleteNote(noteId);
}

export const paginateSortNotes = async (token, userId, page, limit) => {

    if (!token) {
        throw userNotLoggedIn;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw  userNotLoggedIn;
    }

    const verifyTokenResult = await verifyToken(token);
    const loggedInUserId = verifyTokenResult.id;
    console.log(loggedInUserId,userId)
    if(loggedInUserId !== userId) throw notOwner


    page = Number(page);
    limit = Number(limit);

    if (page < 1 || limit < 1) {
        throw new AppError(
            "Page and limit must be greater than 0",
            400
        );
    }

    const skip = (page - 1) * limit;
    console.log('skip: ,', skip)
    return noteRepository.paginateSortNotes(
        userId,
        skip,
        limit
    );
};


export const getNoteById = async (token, noteId) => {
    console.log(token)

    if (!token) throw userNotLoggedIn;

    const verifyTokenResult = await verifyToken(token);
    console.log("verifyToken: ", verifyToken)

    if (!verifyTokenResult) throw userNotLoggedIn;

    const userId = verifyTokenResult.id;

    const noteOwner = await noteRepository.checkNoteOwner(noteId, userId);
    console.log(userId, noteOwner);

    if (!noteOwner) throw notOwner;

    return await noteRepository.getNoteById(noteId);

};

export const getNoteByContent = async (token,content) => {
    if (!token) throw userNotLoggedIn;

    const checkToken = await verifyToken(token);
    if(!checkToken) throw userNotLoggedIn;
    const userId = checkToken.id;
    // check note owner

    const noteOwner = await noteRepository.checkNoteOwnerByContent(content,userId);

    if(!noteOwner) throw notOwner;

    return await noteRepository.getNoteByContent(content);
}

export const getAllNotes = async(token,id)=>{
    if (!token) throw userNotLoggedIn;
    const checkToken = await verifyToken(token);
    if(checkToken.id !== id) throw userNotLoggedIn;

    return await noteRepository.getAllNotes(id);
}

export const aggregateNote = async (token,id) => {
    if (!token) throw userNotLoggedIn;
    const checkToken = await verifyToken(token);
    if (checkToken.id !== id) throw userNotLoggedIn;

    return await noteRepository.aggregateNote(id);


}
export const deleteAllNotes = async (token, id) => {
    if (!token) throw userNotLoggedIn;
    const checkToken = await jwt.decode(token, process.env.JWT_SECRET);
    if (checkToken.id !== id) throw userNotLoggedIn;

    return await noteRepository.deleteAllNotes(id);
}