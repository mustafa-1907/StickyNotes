import * as authRepository from '../repository/auth.repo.js'
import * as otpRepository from '../repository/otp.repository.js'
import * as userRepository from '../../user/repository/user.repo.js'
import bcrypt from "bcrypt";
import crypto from 'node:crypto'
import {sendEmail} from "../../../common/email/nodemailer.js";
import {
    invalidPassword,
    otpExpired,
    otpInvalid,
    userAlreadyExists,
    userAlreadyVerified,
    userNotExists,
    userNotVerified,
} from "../errors.js";

import {AppError} from "../../../common/error/error.js";
import {generateToken} from "../utils/token.js";
import {hashPassword} from "../utils/hash.js";
import {generateOtp} from "../utils/otp.js";

// ** Sign up
export const register = async (userData) => {
    const userExists = await authRepository.checkUserExistByEmail(userData.email);
    if (userExists) throw userAlreadyExists;
    userData.password = await hashPassword(userData.password);
    const createdUser = await authRepository.createUser(userData);

   await sendOtp(userData.email)
    return createdUser;
}

export const sendOtp = async (email) => {
    const userExists = await authRepository.checkUserExistByEmail(email);
    if (!userExists) throw userNotExists
    const getOtp = await otpRepository.getOtp(email)
    console.log("email from sendOtp", email)
    console.log('checkOtp : ',getOtp)
    if(getOtp)  return

    const otp = generateOtp();
    console.log('email: ',email);

    await otpRepository.createOtp({
        code: otp,
        email: email ,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    })

     await sendEmail(email, 'verification code:',
        `<h1>your verification code is</h1>
                <h2>${otp}</h2> `)

    return otp;
}

// !! verify Account
export const verifyAccount = async (email, code) => {
    console.log("email from verifyAccount", email)

    const userExists = await authRepository.checkUserExistByEmail(email);
    if (!userExists) throw userNotExists

    if (userExists.isVerified === true) throw userAlreadyVerified;

    console.log("email:", email);
    console.log("email type:", typeof email);

    const otp = await otpRepository.getOtp(email)
    console.log(otp)
    if (!otp) throw otpExpired
    if (otp.code !== code) throw otpInvalid;

    const updatedUser = await userRepository.updateVerify(email, {isVerified: true})
    await otpRepository.deleteOtp()
    console.log(updatedUser)
    return updatedUser;
}

// ** login
export const login = async (email, password) => {
    const user = await authRepository.checkUserExistByEmail(email);
    if (!user) throw userNotExists

    if (user.isVerified === false) throw userNotVerified;
    const match = await bcrypt.compare(password, user.password)
    console.log(match)
    if (!match) throw invalidPassword;


    return generateToken({
        id: user._id, email: user.email, name: user.email
    });
}

