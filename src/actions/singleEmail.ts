import { Request, Response } from "express"
import nodemailer from 'nodemailer'
import { EMAIL_PASS, EMAIL_USER, PASS } from "../utils/secret";

export default async function singleEmail(req: Request, res: Response) {
    const { emailTo, subject, text, pass } = req.body;

    if (!emailTo || !subject || !text || pass !== PASS) {
        res.status(400).json({
            message: 'Field emailTo, subject, dan text harus diisi dengan benar.',
        });
    } else {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: EMAIL_USER,
            to: emailTo,
            subject,
            text,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email berhasil dikirim!' });
        } catch (error) {
            console.error('Gagal mengirim email:', error);
            res.status(500).json({
                message: 'Terjadi kesalahan saat mengirim email.',
                error,
            });
        }
    }
}