import { Router, Request, Response } from "express";

const router = Router();

router.get("/reports", async (req: Request, res: Response) => {
    const handled = req.body.handled as boolean;
    const page = parseInt(req.body.page as string) || 1;
    try {
        const reportList = await getReportControl(hnadled, page);
        res.status(200).json(reportList);
    } catch {
        res.status(500).json({ error: "Failed to load reports." });
    }
});

export default router;