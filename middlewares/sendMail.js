import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const generateOTP = async () => {
    try {
        const OTP = Math.floor(1000 + Math.random() * 9000)
        return OTP
    } catch (err) {
        console.log(`Otp error:${err}`)
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OWN_EMAIL,
        pass: process.env.OWN_APP_PASS
    }
})

export const sentMail = async (userEmail, otp) => {

    const mailOptions = {
        from: process.env.OWN_EMAIL,
        to: userEmail,
        subject: `OTP for user verification`,
        text: `Your otp is ${otp}`
    }

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }

}

transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP connection is ready to send emails');
    }
})
