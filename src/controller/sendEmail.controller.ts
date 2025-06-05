import { Request, Response } from 'express';
import { sendEmailService } from '../service/sendEmail.service';

export const sendEmailControl = async (userEmail: string, content: string, adminId: number) => {
    await sendEmailService(adminId, userEmail, content);
};
