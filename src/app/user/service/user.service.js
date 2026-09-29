// ** update
import * as authRepository from '../../auth/repository/auth.repo.js';
import * as userRepository from "../repository/user.repo.js";
import {emailAlreadyExists, passwordNotRequired, userNotLoggedIn} from "../user.errors.js";
import {verifyToken} from "../../auth/utils/token.js";

export const updateUser = async(userData, token, id)=>{
    if(!token) throw userNotLoggedIn;
    // check if user already login // check token
    const verifyTokenResult = await verifyToken(token);
    console.log('verifyTokenResult : ',verifyTokenResult)
    // if not throw error
    console.log("id : ",id)
    if(verifyTokenResult.id !== id) throw userNotLoggedIn;
    // check data.email if we have email throw error
    const checkNewEmail = await authRepository.checkUserExistByEmail(userData.email);
    if(checkNewEmail) throw emailAlreadyExists;
    // if user send password throw error
    if(userData.password) throw passwordNotRequired;
    // return updated user
    return await userRepository.updateUser(id,userData);
}

export const deleteUserById = async(token , userId)=>{
    if(!token) throw userNotLoggedIn;
    // check user log-in

    const verifyTokenResult = await verifyToken(token);
    // if not throw error
    if(verifyTokenResult.id !== userId) throw userNotLoggedIn;
    console.log(userId)
    return await userRepository.deleteUserById(userId)
}

export const getUserById = async(token , userId)=>{
    if(!token) throw userNotLoggedIn;
    const verifyTokenResult = await verifyToken(token);
    // if not throw error

    if(verifyTokenResult.id !== userId) throw userNotLoggedIn;

    return await userRepository.getUserById(userId);
}