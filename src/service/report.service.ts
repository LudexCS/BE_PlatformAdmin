import {findReports, saveReport} from "../repository/report.repository";
import {ReportCreateRequestDto} from "../dto/reportCreateRequest.dto";
import { ReportEntity } from "../entity/report.entity";

export const getReports = async(handled: boolean, page: number) => {
    const PAGE_SIZE = 20;
    const offset = (page - 1) * PAGE_SIZE;
    return await findReports(handled, offset, PAGE_SIZE);
};

export const createReport = async (
    dto: ReportCreateRequestDto,
    complainantId: number
): Promise<ReportEntity> => {
    const report = new ReportEntity();
    report.complainantId = complainantId;
    report.reportedGameId = dto.reportedGameId;
    report.reportsDetails = dto.reportsDetails;

    return await saveReport(report);
};