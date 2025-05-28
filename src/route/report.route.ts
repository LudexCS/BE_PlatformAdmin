import { Router, Request, Response } from "express";
import {getReportControl} from "../controller/report.controller";

const router: Router = Router();

router.get("/reports", async (req: Request, res: Response) => {
    try {
        const reportList = await getReportControl(req, res);
        res.status(200).json(reportList);
    } catch {
        res.status(500).json({ error: "Failed to load reports." });
    }
});

export default router;