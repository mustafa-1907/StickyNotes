import * as authService from '../service/auth.service.js'
import {loginDto, registerDto, sendOtpDto, verifyAccountDto} from "../dto/auth.dto.js";
import {validateData} from "../../../common/validation/validation.js";

export const register = async (req, res, next) => {
    try {
        const data = validateData(registerDto, req.body);
        console.log('req.body: ', data);
        const userCreated = await authService.register(data);
        console.log('userCreated:', userCreated)

        res.status(201).json({
            message: 'user created successfully.',
            success: true,
            data: userCreated,

        })
    } catch (err) {
        next(err)
    }
}
export const sendOtp = async (req, res, next) => {
    try {
        const data = validateData(sendOtpDto, req.body);
        const {email} = data;
        await authService.sendOtp(email);
        res.status(201).json({
            message: 'otp sent successfully.',
            success: true,
        })
    } catch (err) {
        next(err)
    }
}
export const verifyAccount = async (req, res, next) => {
    try {
        const data = validateData(verifyAccountDto, req.body);
        console.log('data from contro: ',data)
        const {email, code} = data;
        const updatedUser = await authService.verifyAccount(email, code)
        res.status(200).json({
            message: 'user verified successfully.',
            success: true,
            data: updatedUser,
        })
    } catch (err) {
        next(err)
    }
}

// login
export const login = async (req, res, next) => {
    try {
        const data = validateData(loginDto, req.body);

        const {email, password} = data;
        const token = await authService.login(email, password)
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 60 * 1000
        })
        res.status(200).json({
            message: 'user login successfully.',
            success: true,
        })
    } catch (err) {
        next(err)
    }
}
