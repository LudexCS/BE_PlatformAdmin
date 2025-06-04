import { Request, Response, Router} from "express";
import {getUserDetailControl, getUserListControl} from "../controller/searchUser.controller";


/**
 * @swagger
 * components:
 *   schemas:
 *     UserSummary:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UserDetail'
 *     UserDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 유저 ID
 *           example: 1
 *         email:
 *           type: string
 *           description: 유저 이메일
 *           example: user@example.com
 *         nickname:
 *           type: string
 *           description: 유저 닉네임
 *           example: 게임왕
 *         isBlocked:
 *           type: boolean
 *           description: 차단 여부
 *           example: false
 */
const router: Router = Router();

/**
 * @swagger
 * /api/admin/user/usersList:
 *   get:
 *     summary: "전체 유저 목록 조회"
 *     description: "페이지네이션을 기반으로 전체 유저 리스트를 조회합니다."
 *     tags: [Admin - User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: "조회할 페이지 번호 (기본값: 1)"
 *     responses:
 *       200:
 *         description: "유저 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSummary'
 *       400:
 *         description: "잘못된 요청"
 *       500:
 *         description: "서버 오류"
 */
router.get("/usersList", async (req: Request, res: Response) => {
    try{
        await getUserListControl(req, res);
    } catch(err){
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
});


/**
 * @swagger
 * /api/admin/user/userDetail:
 *   get:
 *     summary: "유저 정보 상세 조회"
 *     description: "userId를 기준으로 유저의 상세 정보를 조회합니다."
 *     tags: [Admin - User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *         description: "조회할 유저의 ID"
 *     responses:
 *       200:
 *         description: "유저 상세 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetail'
 *       400:
 *         description: "잘못된 요청"
 *       404:
 *         description: "유저를 찾을 수 없음"
 */
router.get("/userDetail", async (req: Request, res: Response) => {
    try{
        await getUserDetailControl(req, res);
    } catch(err){
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
});

export default router;