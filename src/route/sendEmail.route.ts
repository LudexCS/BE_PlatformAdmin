// routes/email.route.ts
import {Request, Response, Router} from 'express';
import { sendEmailControl } from '../controller/sendEmail.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/admin/send/email:
 *   post:
 *     summary: 이메일 전송
 *     description: 관리자 계정이 지정된 사용자에게 이메일을 전송합니다.
 *     tags:
 *       - Email
 *     security:
 *       - bearerAuth: []
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
 *                 example: "게임 <strong>\"Pixel Dungeon\"</strong>에 대한 신고가 접수되어 검토 중입니다.<br/>신속한 조치가 필요하니 <a href='https://uosludex.com/my/games/132'>내 게임 관리 페이지</a>를 확인해주세요."
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
router.post('/email', async (req: Request, res: Response) => {
    try {
        await sendEmailControl(req, res);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

export default router;
