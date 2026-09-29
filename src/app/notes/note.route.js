import {Router} from 'express';
import * as notesController from './controller/note.controller.js'
const notesRouter = Router();

notesRouter.post('/:id',notesController.createNote);
notesRouter.patch('/:noteId',notesController.updateNote);
notesRouter.put('/replace/:noteId',notesController.replaceNote);
notesRouter.patch('/all/:noteId',notesController.replaceNotesTitle);
notesRouter.delete('/:noteId',notesController.deleteNote);
notesRouter.get('/paginate-sort', notesController.paginateSortNotes);

notesRouter.get('/posts/:noteId', notesController.getNoteById);

notesRouter.get('/note-by-content/:content', notesController.getNoteByContent);

notesRouter.get('/notes-with-user/:id',notesController.getAllNotes)

notesRouter.get('/aggregate/:id', notesController.aggregateNote);

notesRouter.delete('/delete/:id', notesController.deleteAllNotes);
export default notesRouter;