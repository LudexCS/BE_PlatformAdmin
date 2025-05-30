// service/email.service.ts
import nodemailer from 'nodemailer';
import { findIdByEmail } from '../repository/account.repository';
import { insertEmailLog } from '../repository/sendEmail.repository';

export const sendEmailService = async (
    adminId: number,
    userEmail: string,
    content: string
) => {
    const receiverId = await findIdByEmail(userEmail);

    if (!adminId || !receiverId) {
        throw new Error('Invalid admin or user email');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `process.env.MAIL_USER`,
        to: userEmail,
        subject: '[Notice] Message from Ludex Admin',
        text: content,
    });

    await insertEmailLog(adminId, receiverId, content);
};
