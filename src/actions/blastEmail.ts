import { Request, Response } from "express"
import nodemailer from "nodemailer"
import path from "path"
import fs from "fs"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default async function blastEmail(req: Request, res: Response) {
    const { emailList, subject, text, pass } = req.body

    let responded = false

    if (!Array.isArray(emailList) || emailList.length === 0) {
        if (!responded) {
            res.status(400).json({ message: "Field emailList (array), subject, dan text harus diisi." })
            responded = true
        }
    }

    if (typeof subject !== "string" || typeof text !== "string") {
        if (!responded) {
            res.status(400).json({ message: "Field subject dan text harus berupa string." })
            responded = true
        }
    }

    if (pass !== process.env.PASS) {
        if (!responded) {
            res.status(403).json({ message: "Password salah." })
            responded = true
        }
    }

    if (responded) return

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    const pdfPath = path.join(process.cwd(), "src", "asset", "tes.pdf")

    if (!fs.existsSync(pdfPath)) {
        console.error("File PDF tidak ditemukan di:", pdfPath)
    }

    const results: { to: string; success: boolean; error?: any }[] = []

    for (const email of emailList) {
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject,
                text,
                attachments: [
                    {
                        filename: "tes.pdf",
                        path: pdfPath,
                        contentType: "application/pdf",
                    },
                ],
            })
            console.log(`Email berhasil dikirim ke: ${email}`)
            results.push({ to: email, success: true })
        } catch (error) {
            console.error(`Gagal mengirim email ke: ${email}`, error)
            results.push({ to: email, success: false, error })
        }

        await delay(3000)
    }

    if (!responded) {
        res.status(200).json({
            message: "Proses pengiriman selesai.",
            results,
        })
    }
}
