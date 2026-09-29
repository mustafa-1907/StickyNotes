import {OTP} from '../model/otp.model.js'

export const createOtp = async (otpData) => {
    return await OTP.create(otpData)

}
export const getOtp = async (email) => {
    return await OTP.findOne({email: email},{},{})
}
export const deleteOtp = async (email) => {
    return await OTP.deleteMany({email:email})
}

