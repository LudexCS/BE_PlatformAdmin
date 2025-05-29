import { Router, Request, Response } from "express";
import {getReportControl} from "../controller/report.controller";


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
 *     description: 유저가 신고한 게임에 대한 전체 신고 목록을 조회합니다. (관리자 전용)
 *     tags:
 *       - Report (관리자)
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
 *         description: 서버 오류로 신고 목록을 불러오지 못함
 */
router.get("/getList", async (req: Request, res: Response) => {
    try {
        const reportList = await getReportControl(req, res);
        res.status(200).json(reportList);
    } catch {
        res.status(500).json({error: "Failed to load reports."});
    }
});

export default router;