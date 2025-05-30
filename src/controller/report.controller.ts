import {getReports, createReport, handleReportService} from "../service/report.service";
import {Request, Response} from "express";
import {ReportCreateRequestDto} from "../dto/reportCreateRequest.dto";
import {findIdByEmail} from "../repository/account.repository";

export const getReportControl = async(req: Request,res: Response) => {
    const handled = req.query.handled === "true";
    const page = parseInt(req.query.page as string) || 1;
    return getReports(handled, page);
}

export const createReportControl = async (req: Request, res: Response) => {
        const userEmail = req.user as string;
        const userId = await findIdByEmail(userEmail);
        const dto = req.body as ReportCreateRequestDto;
        return await createReport(dto, userId);
};

export const handleReportControl = async (req: Request, res: Response) => {
    const reportId = req.body.reportId;
    const adminId = req.userId as number;

    if (!reportId || !adminId) {
        throw new Error("Missing reportId or admin identity.");
    }

    return await handleReportService(reportId, adminId);
};