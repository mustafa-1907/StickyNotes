import {AppError} from "../../common/error/error.js";

export const inValidNoteId = new AppError('Invalid Note Id', 400)

export const notOwner = new AppError('you are not owner', 400)

