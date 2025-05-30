// routes/email.route.ts
import express, {Request, Response} from 'express';
import { sendEmailControl } from '../controller/sendEmail.controller';

const router = express.Router();

router.post('/send', async (req: Request, res: Response) => {
    try {
        await sendEmailControl(req, res);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

export default router;
