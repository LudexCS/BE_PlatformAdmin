import sharp from "sharp";
import fs from "fs/promises";
import {CreateBannerDto} from "../dto/banner.dto";
import {Request, Response, Router} from "express";
import multer from "multer";
import {createBannerControl} from "../controller/banner.controller";

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
          .resize(1229, 819, { fit: "cover" })
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

export default router;