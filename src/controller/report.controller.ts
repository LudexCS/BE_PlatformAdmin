import {getReports, createReport} from "../service/report.service";
import {Request, Response} from "express";
import {ReportCreateRequestDto} from "../dto/reportCreateRequest.dto";
import {findIdByEmail} from "../repository/account.repository";

export const getReportControl = async(req: Request,) => {
    const handled = req.body.handled as boolean;
    const page = parseInt(req.body.page as string) || 1;
    return getReports(handled, page);
}

export const createReportControl = async (req: Request) => {
        const userEmail = req.user as string;
        const userId = await findIdByEmail(userEmail);
        const dto = req.body as ReportCreateRequestDto;
        return await createReport(dto, userId);
};