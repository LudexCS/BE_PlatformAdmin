import {getReports} from "../service/report.service";
import {Request, Response} from "express";

export const getReportControl = async(req: Request, res: Response) => {
    const handled = req.body.handled as boolean;
    const page = parseInt(req.body.page as string) || 1;
    return getReports(handled, page);
}