import { Request, Response } from "express";
import nodemailer from "nodemailer";
import path from "path";

interface Participant {
  email: string;
  name: string;
}

const participants: Participant[] = [
  { email: "rady61163@gmail.com", name: "Muhammad" },
  { email: "sendalterbang9696@gmail.com", name: "Radya" },
  { email: "radyaproject@gmail.com", name: "Iftikhar" },
  { email: "radyaiftikhar@webmail.umm.ac.id", name: "Radya" },
  { email: "rady61163@gmail.com", name: "Muhammad" },
  { email: "sendalterbang9696@gmail.com", name: "Radya" },
  { email: "radyaproject@gmail.com", name: "Iftikhar" },
  { email: "radyaiftikhar@webmail.umm.ac.id", name: "Radya" },
  { email: "rady61163@gmail.com", name: "Muhammad" },
  { email: "sendalterbang9696@gmail.com", name: "Radya" },
  { email: "radyaproject@gmail.com", name: "Iftikhar" },
  { email: "radyaiftikhar@webmail.umm.ac.id", name: "Radya" },
  { email: "rady61163@gmail.com", name: "Muhammad" },
  { email: "sendalterbang9696@gmail.com", name: "Radya" },
  { email: "radyaproject@gmail.com", name: "Iftikhar" },
  { email: "radyaiftikhar@webmail.umm.ac.id", name: "Radya" },
  { email: "sendalterbang9696@gmail.com", name: "Radya" },
  { email: "radyaproject@gmail.com", name: "Iftikhar" },
  { email: "radyaiftikhar@webmail.umm.ac.id", name: "Radya" },
  { email: "sendalterbang9696@gmail.com", name: "Radya" },
  { email: "radyaproject@gmail.com", name: "Iftikhar" },
  { email: "radyaiftikhar@webmail.umm.ac.id", name: "Radya" },
];

export default async function tes(req: Request, res: Response) {
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

Salam hangat,
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
