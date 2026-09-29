import * as noteService from '../service/note.service.js';

export const createNote = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {id} = req.query;
        const {title, content} = req.body;

        console.log("token:", token);
        console.log("userId:", id);
        console.log("title:", title);
        console.log("content:", content);

        const createdNote = await noteService.createNote(
            token,
            id,
            title,
            content
        );

        res.status(201).json({
            message: "Note Created successfully",
            success: true,
            data: createdNote
        });

    } catch (err) {
        next(err);
    }
};


export const updateNote = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {noteId} = req.query;
        const {title, content} = req.body;

        console.log("noteId:", noteId);

        const updatedNote = await noteService.updateNote(
            token,
            noteId,
            title,
            content
        );

        res.status(200).json({
            message: "Note Updated successfully",
            success: true,
            data: updatedNote
        });

    } catch (err) {
        next(err);
    }
};


export const replaceNote = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {noteId} = req.query;
        const {title, content} = req.body;

        const replacedData = await noteService.replaceNote(
            token,
            noteId,
            title,
            content
        );

        res.status(200).json({
            message: "Note Replaced successfully",
            success: true,
            data: replacedData
        });

    } catch (err) {
        next(err);
    }
};


export const replaceNotesTitle = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {id} = req.query;
        const {title} = req.body;

        const updatedNotes = await noteService.replaceNotesTitle(
            token,
            id,
            title
        );
        if (updatedNotes === 0) {
            return res.status(400).json({
                message: "No Notes Found",
                success: false,

            })

        }
        res.status(200).json({
            message: ` ${updatedNotes} Notes titles updated successfully`,
            success: true,
        });

    } catch (err) {
        next(err);
    }
};

export const deleteNote = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {noteId} = req.query;
        const removedNote = await noteService.deleteNote(token, noteId)
        res.status(200).json({
            message: "Note deleted",
            success: true,
            data: removedNote
        })
    } catch (err) {
        next(err);
    }
};

export const paginateSortNotes = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];

        const {page, limit, userId} = req.query;

        const notes = await noteService.paginateSortNotes(
            token,
            userId,
            page,
            limit
        );
        console.log(notes.length);
        if (!notes || notes.length === 0) {
            return res.status(404).json({
                message: "No Notes Found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Notes retrieved successfully",
            success: true,
            data: notes
        });

    } catch (err) {
        next(err);
    }
};

export const getNoteById = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];

        const {noteId} = req.query;
        console.log(token)
        const note = await noteService.getNoteById(token, noteId);
        res.status(200).json({
            message: "note retrieved successfully",
            success: true,
            data: note
        })

    } catch (err) {
        next(err);
    }
};

export const getNoteByContent = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {content} = req.query;
        const Note = await noteService.getNoteByContent(token, content);
        res.status(200).json({
            message: "Note retrieved successfully",
            success: true,
            data: Note
        })

    } catch (err) {
        next(err);
    }
}

export const getAllNotes = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {id} = req.query;
        const notes = await noteService.getAllNotes(token, id);
        if(notes.length === 0) {
            res.status(404).json({
                message: "No Notes Found",
                success: false
            })
        }
        res.status(200).json({
            message: "notes retrieved successfully",
            success: true,
            data: notes
        })
    } catch (err) {
        next(err);
    }
}

export const aggregateNote = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {id} = req.query;
        console.log(id)
        const notes = await noteService.aggregateNote(token, id);
        res.status(200).json({
            message: "data:",
            success: true,
            data: notes
        })
    } catch (err) {
        next(err);
    }
}

export const deleteAllNotes = async (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        const {id} = req.query;
        await noteService.deleteAllNotes(token, id);
        res.status(200).json({
            message: "deleted",
            success: true,
        })
    } catch (err) {
        next(err);
    }
}