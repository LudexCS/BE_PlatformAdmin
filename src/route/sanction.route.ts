import {Router, Request, Response} from "express";
import {
    sanctionGameControl,
    sanctionUserControl,
    freeSanctionGameControl,
    freeSanctionUserControl,
    getSanctionedGamesControl,
    getSanctionedUsersControl,
} from "../controller/sanction.controller";

/**
 * @swagger
 * tags:
 *   - name: Sanction
 *     description: 게임 및 유저 제재(차단) 관리 API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     SanctionRequest:
 *       type: object
 *       properties:
 *         adminEmail:
 *           type: string
 *           example: "admin@example.com"
 *         gameTitle:
 *           type: string
 *           example: "Offensive Game"
 *         userEmail:
 *           type: string
 *           example: "user@example.com"
 *         sanctionDetail:
 *           type: string
 *           example: "불쾌한 콘텐츠 포함"
 *
 *     SanctionFreeGameRequest:
 *       type: object
 *       properties:
 *         gameTitle:
 *           type: string
 *           example: "Offensive Game"
 *
 *     SanctionFreeUserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "baduser@example.com"
 *
 *     SanctionedGameResponse:
 *       type: object
 *       properties:
 *         gameTitle:
 *           type: string
 *           example: "Offensive Game"
 *         sanctionDetail:
 *           type: string
 *           example: "폭력성 이슈"
 *         startedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-28T10:30:00Z"
 *
 *     SanctionedUserResponse:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           example: "badUser123"
 *         email:
 *           type: string
 *           example: "baduser@example.com"
 *         sanctionDetail:
 *           type: string
 *           example: "욕설 및 도배"
 *         startedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-27T17:00:00Z"
 */

const router: Router = Router();


/**
 * @swagger
 * /api/admin/sanction/game:
 *   post:
 *     summary: 게임 제재 등록
 *     tags: [Sanction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - adminEmail
 *               - gameTitle
 *               - sanctionDetail
 *             properties:
 *               adminEmail:
 *                 type: string
 *                 example: "admin@example.com"
 *               gameTitle:
 *                 type: string
 *                 example: "Offensive Game"
 *               sanctionDetail:
 *                 type: string
 *                 example: "불쾌한 콘텐츠 포함"
 *     responses:
 *       201:
 *         description: 게임 제재 성공
 *       400:
 *         description: 요청 오류
 */
router.post("/game", async (req: Request, res: Response) => {
    try {
        await sanctionGameControl(req, res);
        res.status(201).json({message: "Game sanctioned"});
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
});


/**
 * @swagger
 * /api/admin/sanction/user:
 *   post:
 *     summary: 유저 제재 등록
 *     tags: [Sanction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - adminEmail
 *               - userEmail
 *               - sanctionDetail
 *             properties:
 *               adminEmail:
 *                 type: string
 *                 example: "admin@example.com"
 *               userEmail:
 *                 type: string
 *                 example: "user@example.com"
 *               sanctionDetail:
 *                 type: string
 *                 example: "욕설 및 도배"
 *     responses:
 *       201:
 *         description: 유저 제재 성공
 *       400:
 *         description: 요청 오류
 */
router.post("/user", async (req: Request, res: Response) => {
    try {
        await sanctionUserControl(req, res);
        res.status(201).json({message: "User sanctioned"});
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
});


/**
 * @swagger
 * /api/admin/sanction/free/game:
 *   post:
 *     summary: 게임 제재 해제
 *     tags: [Sanction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameTitle
 *             properties:
 *               gameTitle:
 *                 type: string
 *                 example: "Offensive Game"
 *     responses:
 *       200:
 *         description: 게임 제재 해제 성공
 *       400:
 *         description: 요청 오류
 */
router.post("/free/game", async (req: Request, res: Response) => {
    try {
        await freeSanctionGameControl(req, res);
        res.status(200).json({message: "Game sanction removed"});
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
});

/**
 * @swagger
 * /api/admin/sanction/free/user:
 *   post:
 *     summary: 유저 제재 해제
 *     tags: [Sanction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: 유저 제재 해제 성공
 *       400:
 *         description: 요청 오류
 */
router.post("/free/user", async (req: Request, res: Response) => {
    try {
        await freeSanctionUserControl(req, res);
        res.status(200).json({message: "User sanction removed"});
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
});


/**
 * @swagger
 * /api/admin/sanction/gameList:
 *   get:
 *     summary: 제재된 게임 목록 조회
 *     tags: [Sanction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: 페이지 번호
 *     responses:
 *       200:
 *         description: 제재된 게임 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   gameTitle:
 *                     type: string
 *                     example: "Offensive Game"
 *                   sanctionDetail:
 *                     type: string
 *                     example: "폭력성 포함"
 *                   startedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-28T10:30:00Z"
 */
router.get("/gameList", async (req: Request, res: Response) => {
    try {
        const result = await getSanctionedGamesControl(req, res);
        res.status(200).json(result);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Failed to fetch sanctioned games" });
        }
    }
});

/**
 * @swagger
 * /api/admin/sanction/userList:
 *   get:
 *     summary: 제재된 유저 목록 조회
 *     tags: [Sanction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: 페이지 번호
 *     responses:
 *       200:
 *         description: 제재된 유저 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SanctionedUserResponse'
 */
router.get("/userList", async (req: Request, res: Response) => {
    try {
        const result = await getSanctionedUsersControl(req, res);
        res.status(200).json(result);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Failed to fetch sanctioned users" });
        }
    }
});

export default router;
