import dotenv from 'dotenv'
import { Resend } from 'resend'
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export const sentMail = async (userEmail, otp) => {
    try {
        const {data,error} = await resend.emails.send({
            from: "Luminova <luminova@resend.dev>",
            to: userEmail,
            subject: "OTP for user verification",
            text: `Your OTP is ${otp}. It expires in 1 minutes.`,
            html: `
                <h2>Email Verification</h2>
                <p>Your OTP is:</p>
                <h1><b>${otp}</b></h1>
                <p>This OTP expires in 1 minutes.</p>
            `
        })
        if(error){
            throw new Error(error.message)
        }
        return data
    } catch (error) {
       console.error("Email sending failed:", error);
        throw error;
    }
}

export const generateOTP = async () => {
    try {
        const OTP = Math.floor(1000 + Math.random() * 9000)
        return OTP
    } catch (err) {
        console.log(`Otp error:${err}`)
    }
}