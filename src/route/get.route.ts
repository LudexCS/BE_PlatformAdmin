import { Router } from "express";
import { getTagControl } from "../controller/tag.controller";
import { TagDto } from "../dto/tag.dto";

/**
 * @swagger
 * tags:
 *   - name: Tag
 *     description: 태그 조회 API
 *
 * components:
 *   schemas:
 *     TagDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "Action"
 */
const router: Router = Router();

/**
 * @swagger
 * /api/get/tag:
 *   get:
 *     summary: 전체 태그 목록 조회
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: 태그 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TagDto'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.get("/tag", async (req, res) => {
    try {
        const tags: TagDto[] = await getTagControl();
        res.status(200).json(tags);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;