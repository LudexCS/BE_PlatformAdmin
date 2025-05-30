import {Request, Response, Router} from "express";
import {createReportControl} from "../controller/report.controller";

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
 * /getList:
 *   get:
 *     summary: 신고 목록 조회
 *     description: 처리 여부와 페이지 번호를 기준으로 신고 목록을 조회합니다.
 *     tags:
 *       - Report
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
 *                 $ref: '#/components/schemas/Report'
 *       500:
 *         description: 서버 오류로 인해 신고 목록을 불러오지 못함
 */
router.post("/post", async (req: Request, res: Response) => {
    try {
        await createReportControl(req, res);
        res.status(200).json({message: "Report successfully."});
    } catch {
        res.status(500).json({error: "Failed to report."});
    }
});
export default router;