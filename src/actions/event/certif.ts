import { Request, Response } from "express";
import nodemailer from "nodemailer";
import path from "path";

interface Participant {
    email: string;
    name: string;
}

const participants: Participant[] = [
    { email: "razkyganendya@webmail.umm.ac.id", name: "Razky Ganendya Capriawan" },
    { email: "nabils24_informatika_357@webmail.umm.ac.id", name: "Nabil Sahsada Suratno" },
    { email: "mibrahimalayubi@webmail.umm.ac.id", name: "Muhammad Ibrahim Al Ayubi" },
    { email: "shofwanaliffigma18@gmail.com", name: "Shofwan Alif Alfani" },
    { email: "naufalarkaan25@gmail.com", name: "Naufal Arkaan" },
    { email: "erdymfakhri@webmail.umm.ac.id", name: "Erdy Muhammad Fakhri" },
    { email: "ismaildwimuh.anugerah@gmail.com", name: "Ismail Dwi Muh. Anugerah" },
    { email: "elgafarma@webmail.umm.ac.id", name: "ELGA PUTRI TRI FARMA" },
    { email: "mumininsodia@gmail.com", name: "Ahmad Nur Mu'minin" },
    { email: "vieroalfiandhy@webmail.umm.ac.id", name: "Viero Alfiandhy Havist" },
    { email: "marenoali03@gmail.com", name: "Mareno Ali Ibrahim" },
    { email: "haidardimas003@webmail.umm.ac.id", name: "Haidar Dimas Heryanto" },
    { email: "ramaadyan1@gmail.com", name: "Muhammad Parama Adyan" },
    { email: "residencezmarvel@gmail.com", name: "Ayshea Marvella Pasha" },
    { email: "bagussyahrijal123@gmail.com", name: "Tubagus Syahrijal Amri" },
    { email: "adiluffy77@gmail.com", name: "Rakhmat Fadhilah" },
    { email: "yossuagung2@gmail.com", name: "Yossua Agung Budianto" },
];

export default async function eventCertif(req: Request, res: Response) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const results = [];

    for (const participant of participants) {
        const attachmentPath = path.resolve(
            process.cwd(),
            "src",
            "asset",
            "certif",
            `${participant.name}.pdf`
        );

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: participant.email,
            subject: "Sertifikat Workshop CRUD dengan Framework Laravel",
            text: `Halo ${participant.name},

Terima kasih telah berpartisipasi dalam Workshop CRUD dengan Framework Laravel yang diselenggarakan oleh Tim 2.

Sebagai bentuk apresiasi kami melampirkan sertifikat atas keikutsertaan Anda dalam acara ini.

Semoga ilmu yang didapatkan dapat bermanfaat dan meningkatkan kemampuan kamu dalam pengembangan aplikasi web.

Jika ada pertanyaan atau kebutuhan lainnya, jangan ragu untuk menghubungi kami.

Tim 2 UE
`,
            attachments: [
                {
                    filename: `${participant.email}.pdf`,
                    path: attachmentPath,
                },
            ],
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email terkirim ke ${participant.email}`);
            results.push({ to: participant.email, success: true });
        } catch (error) {
            console.error(`Gagal mengirim email ke ${participant.email}:`, error);
            results.push({ to: participant.email, success: false, error });
        }

        await new Promise((r) => setTimeout(r, 2000));
    }

    res.status(200).json({
        message: "Proses pengiriman sertifikat selesai.",
        results,
    });
}
