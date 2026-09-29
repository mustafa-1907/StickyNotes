import {AppError} from "../../common/error/error.js";

export const emailAlreadyExists= new AppError('Email Already exists!', 409);
export const userNotLoggedIn= new AppError('Please Login-in again!',403)
export const passwordNotRequired= new AppError('password not required',400)