import { Router } from "express";
import { getTagControl } from "../controller/tag.controller";
import { TagDto } from "../dto/tag.dto";
import {getBannerControl} from "../controller/banner.controller";
import {GetBannerDto} from "../dto/banner.dto";

/**
 * @swagger
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
 * components:
 *   schemas:
 *     GetBannerDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         imageUrl:
 *           type: string
 *         linkUrl:
 *           type: string
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

/**
 * @swagger
 * /api/get/banner:
 *   get:
 *     summary: 전체 배너 목록 조회
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: 배너 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetBannerDto'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.get("/banner", async (req, res) => {
    try {
        const banners: GetBannerDto[] = await getBannerControl();
        res.status(200).json(banners);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;