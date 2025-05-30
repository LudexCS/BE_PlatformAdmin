import { Router, Request, Response } from "express";
import {getReportControl, handleReportControl} from "../controller/report.controller";


/**
 * @swagger
 * components:
 *   schemas:
 *     ReportDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         complainantId:
 *           type: integer
 *           example: 7
 *         reportedGameId:
 *           type: integer
 *           example: 42
 *         reportsDetails:
 *           type: string
 *           example: "욕설 및 부적절한 콘텐츠 포함"
 *         reportedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-29T15:34:23.000Z"
 *         isHandled:
 *           type: boolean
 *           example: false
 *         handledAdminId:
 *           type: integer
 *           nullable: true
 *           example: null
 *         handledAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 */
const router: Router = Router();


/**
 * @swagger
 * /api/admin/report/getList:
 *   get:
 *     summary: 신고 목록 조회
 *     description: 처리 여부와 페이지 번호를 기준으로 신고 목록을 조회합니다.
 *     tags:
 *       - Report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: handled
 *         required: true
 *         schema:
 *           type: boolean
 *         description: true면 처리된 신고만, false면 미처리 신고만 조회
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호 (기본값 1)
 *     responses:
 *       200:
 *         description: 신고 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReportDto'
 *       500:
 *         description: 서버 오류로 인해 신고 목록을 불러오지 못함
 */
router.get("/getList", async (req: Request, res: Response) => {
    try {
        const reportList = await getReportControl(req, res);
        res.status(200).json(reportList);
    } catch {
        res.status(500).json({error: "Failed to load reports."});
    }
});

/**
 * @swagger
 * /api/admin/report/handleReport:
 *   post:
 *     summary: 신고 처리 완료
 *     description: 특정 reportId의 신고를 처리 상태로 변경합니다.
 *     tags:
 *       - Report
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: 신고가 처리됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report marked as handled."
 *       400:
 *         description: 잘못된 요청 (이미 처리되었거나 존재하지 않는 ID)
 */
router.post("/handleReport", async (req: Request, res: Response) => {
    try {
        const result = await handleReportControl(req, res);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

export default router;