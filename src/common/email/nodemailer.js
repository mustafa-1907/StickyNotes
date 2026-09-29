import nodemailer from "nodemailer";
import {config} from "dotenv";
config()

    const transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        }
    })

export const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"Sticky Notes App" <${process.env.NODEMAILER_USER}>`,
        to: to,
        subject: subject,
        html: html
    });
}