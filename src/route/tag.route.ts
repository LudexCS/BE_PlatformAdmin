import { Router } from "express";
import { createTagControl, deleteTagControl, updateTagControl } from "../controller/tag.controller";

/**
 * @swagger
 * tags:
 *   name: Tag
 *   description: 태그 관리 API
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     CreateTagDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Action"
 *     UpdateTagDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "Adventure"
 *     DeleteTagDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 */
const router: Router = Router();

/**
 * @swagger
 * /api/admin/tag/create:
 *   post:
 *     summary: 태그 생성
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTagDto'
 *     responses:
 *       201:
 *         description: 생성된 태그 ID 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.post("/create", async (req, res) => {
    try {
        const id = await createTagControl(req);
        res.status(201).json({ id });
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
 * /api/admin/tag/update:
 *   put:
 *     summary: 태그 수정
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTagDto'
 *     responses:
 *       200:
 *         description: 성공적으로 수정됨
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.put("/update", async (req, res) => {
    try {
        await updateTagControl(req);
        res.status(200).json({ message: "Update tag successfully" });
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
 * /api/admin/tag/delete:
 *   delete:
 *     summary: 태그 삭제
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteTagDto'
 *     responses:
 *       200:
 *         description: 성공적으로 삭제됨
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.delete("/delete", async (req, res) => {
    try {
        await deleteTagControl(req);
        res.status(200).json({ message: "Delete tag successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;