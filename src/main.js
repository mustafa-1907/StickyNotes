import {config} from 'dotenv'

config()
import express from 'express'
import './common/db/mongoose.js'
import authRouter from "./app/auth/auth.route.js";
import userRouter from "./app/user/user.route.js";
import notesRouter from "./app/notes/note.route.js";
import {OTP} from "./app/auth/model/otp.model.js";
import cookieParser from "cookie-parser";


const app = express()
app.use(express.json())
app.use(cookieParser())
// routes navigation
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/notes', notesRouter)

app.use((err, req, res, next) => {
    console.log(err.message , err.stack)
    if (err.isOperational === true) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
            stack: err.stack
        })
    }
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })

})
app.listen(3000, () => {
    console.log('Server running on port 3000')
})