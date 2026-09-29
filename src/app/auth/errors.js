import {AppError} from "../../common/error/error.js";

export const userNotExists = new AppError(
    'User does not exist',
    404
);

export const userAlreadyExists = new AppError(
    'User already exists',
    409
);

export const userNotVerified = new AppError(
    'User not verified',
    403
);

export const userAlreadyVerified = new AppError(
    'User already verified',
    409
);

export const otpExpired = new AppError(
    'OTP expired! Please resend OTP',
    410
);

export const otpInvalid = new AppError(
    'OTP code is invalid',
    400
);

export const invalidPassword = new AppError(
    'Password is invalid',
    401
);

