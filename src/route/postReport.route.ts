import {Request, Response, Router} from "express";
import {createReportControl} from "../controller/report.controller";
import {findIdByEmail} from "../repository/account.repository";
import {ReportCreateRequestDto} from "../dto/reportCreateRequest.dto";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateReportDto:
 *       type: object
 *       required:
 *         - reportedGameId
 *       properties:
 *         reportedGameId:
 *           type: integer
 *           description: 신고할 대상 게임의 ID
 *           example: 42
 *         reportsDetails:
 *           type: string
 *           description: 신고 사유 또는 상세 내용 (선택)
 *           example: "부적절한 게임 설명과 선정적인 콘텐츠 포함"
 */
const router: Router = Router();


/**
 * @swagger
 * /api/protected/report/post:
 *   post:
 *     summary: 게임 신고 등록
 *     description: 유저가 특정 게임을 신고합니다. JWT 인증이 필요합니다.
 *     tags:
 *       - Report (유저)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReportDto'
 *     responses:
 *       200:
 *         description: 신고가 성공적으로 등록됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Report successfully.
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류로 신고 실패
 */
router.post("/post", async (req: Request, res: Response) => {
    try {
        const userEmail = req.user as string;
        const userId = await findIdByEmail(userEmail);
        const dto = req.body as ReportCreateRequestDto;

        await createReportControl(userId, dto);
        res.status(200).json({message: "Report successfully."});
    } catch {
        res.status(500).json({error: "Failed to report."});
    }
});
export default router;