import sharp from "sharp";
import fs from "fs/promises";
import {CreateBannerDto, GetBannerDto, UpdateBannerDto} from "../dto/banner.dto";
import {Request, Response, Router} from "express";
import multer from "multer";
import {
    adminGetBannerControl,
    createBannerControl,
    deleteBannerControl,
    updateBannerControl
} from "../controller/banner.controller";


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateBannerDto:
 *       type: object
 *       required:
 *         - title
 *         - visible
 *         - priority
 *         - startsAt
 *         - endsAt
 *       properties:
 *         title:
 *           type: string
 *           description: 배너 제목
 *           example: "여름 한정 할인"
 *         linkUrl:
 *           type: string
 *           description: 배너 클릭 시 이동할 URL (선택)
 *           example: "https://example.com/promo"
 *         visible:
 *           type: boolean
 *           description: 배너 표시 여부
 *           example: true
 *         priority:
 *           type: integer
 *           description: 배너 우선순위 (높을수록 먼저 노출됨)
 *           example: 1
 *         startsAt:
 *           type: string
 *           format: date-time
 *           description: 배너 노출 시작 시각 (ISO 8601 형식)
 *           example: "2025-06-10T00:00:00Z"
 *         endsAt:
 *           type: string
 *           format: date-time
 *           description: 배너 노출 종료 시각 (ISO 8601 형식)
 *           example: "2025-06-20T23:59:59Z"
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
 *         visible:
 *           type: boolean
 *         priority:
 *           type: number
 *         startsAt:
 *           type: string
 *           format: date-time
 *         endsAt:
 *           type: string
 *           format: date-time
 */
const router: Router = Router();

const upload = multer({ dest: "uploads/" });


/**
 * @swagger
 * /api/admin/banner/create:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               json:
 *                 type: string
 *                 format: application/json
 *                 description: JSON string of banner metadata
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: Banner image file
 *     responses:
 *       201:
 *         description: Banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: integer
 *                   description: ID of the newly created banner
 *                   example: 1
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/create', upload.fields([
    { name: 'imageUrl', maxCount: 1 }
]), async (req: Request, res: Response) => {
    try {
        const createBannerDto: CreateBannerDto = JSON.parse(req.body.json) as CreateBannerDto;

        const imageFile = (req.files as any)?.['imageUrl']?.[0];
        if (!imageFile) throw new Error("No banner image file uploaded");

        const webpPath = imageFile.path + ".webp";
        await sharp(imageFile.path)
          .resize(1229, 819, { fit: "inside" })
          .webp({ quality: 80 })
          .toFile(webpPath);
        await fs.unlink(imageFile.path);

        createBannerDto.imageUrl = {
          path: webpPath,
          mimetype: "image/webp"
        };

        createBannerDto.adminId = req.userId as number;

        const bannerId = await createBannerControl(createBannerDto);
        res.status(201).json({ Id: bannerId });
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
 * /api/admin/banner/delete:
 *   delete:
 *     summary: 배너 삭제
 *     tags: [Banner]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 배너의 ID
 *     responses:
 *       200:
 *         description: 배너 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner deleted successfully
 *       400:
 *         description: 잘못된 요청 (ID 오류 등)
 *       500:
 *         description: 서버 내부 오류
 */
router.delete('/delete', async (req: Request, res: Response) => {
    try{
        const bannerId = Number(req.query.bannerId);
        await deleteBannerControl(bannerId);

        res.status(200).json({message: "Banner deleted successfully"});

    } catch(error){
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
})


/**
 * @swagger
 * /api/admin/banner/update:
 *   patch:
 *     summary: 배너 수정
 *     description: bannerId에 해당하는 배너 정보를 수정합니다.
 *     tags: [Banner]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 배너의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBannerDto'
 *     responses:
 *       200:
 *         description: 배너 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner updated successfully
 *       400:
 *         description: 잘못된 요청 (파라미터 오류 등)
 *       500:
 *         description: 서버 내부 오류
 */
router.patch('/update', async (req: Request, res: Response) => {
    try{
        const bannerId = Number(req.query.bannerId);
        const updateBannerDto = req.body as UpdateBannerDto;
        await updateBannerControl(bannerId, updateBannerDto);

        res.status(200).json({message: "Banner updated successfully"});
    } catch(error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Server Error"});
        }
    }
})

/**
 * @swagger
 * /api/admin/banner/get/bannerList:
 *   get:
 *     summary: 관리자용 전체 배너 목록 조회
 *     tags: [Banner]
 *     security:
 *      - bearerAuth: []
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
router.get("/get/bannerList", async (req, res) => {
    try {
        const banners: GetBannerDto[] = await adminGetBannerControl();
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