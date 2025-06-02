// routes/email.route.ts
import {Request, Response, Router} from 'express';
import { sendEmailControl } from '../controller/sendEmail.controller';


/**
 * @swagger
 * /api/admin/sendEmail:
 *   post:
 *     summary: 이메일 전송
 *     description: 관리자 계정이 지정된 사용자에게 이메일을 전송합니다.
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 example: user@user.com
 *                 description: 이메일 수신자 (회원)
 *               content:
 *                 type: string
 *                 example: "서비스 이용에 불편을 드려 죄송합니다."
 *                 description: 이메일 본문 내용
 *     responses:
 *       200:
 *         description: 이메일 전송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email sent successfully
 *       500:
 *         description: 서버 오류 (전송 실패)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
const router: Router = Router();

router.post('/send', async (req: Request, res: Response) => {
    try {
        await sendEmailControl(req, res);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

export default router;
