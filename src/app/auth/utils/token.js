import jwt from 'jsonwebtoken'
import {userNotLoggedIn} from "../../user/user.errors.js";

export const generateToken =  payload => {
    return  jwt.sign(payload , process.env.JWT_SECRET,{expiresIn: '1d'});
}

export const verifyToken = async token => {
    if (!token) throw userNotLoggedIn;
    return jwt.verify(token, process.env.JWT_SECRET)
}