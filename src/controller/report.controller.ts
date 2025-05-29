import {getReports, createReport} from "../service/report.service";
import {Request, Response} from "express";
import {ReportCreateRequestDto} from "../dto/report.dto";
import {getUserIdByEmail} from "../service/user.service";

export const getReportControl = async(req: Request, res: Response) => {
    const handled = req.body.handled as boolean;
    const page = parseInt(req.body.page as string) || 1;
    return getReports(handled, page);
}

export const createReportControl = async (req: Request, res: Response) => {
        const userEmail = req.user as string;
        const userId = await getUserIdByEmail(userEmail);
        const dto = req.body as ReportCreateRequestDto;
        return await createReport(dto, userId);
};