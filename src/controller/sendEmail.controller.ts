import { Request, Response } from 'express';
import { sendEmailService } from '../service/sendEmail.service';

export const sendEmailControl = async (req: Request, res: Response) => {
    const { userEmail, content } = req.body;
    const adminId = req.userId as number;

    try {
        await sendEmailService(adminId, userEmail, content);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
