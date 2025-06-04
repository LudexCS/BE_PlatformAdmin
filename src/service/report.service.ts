import {findReportById, findReports, saveReport, updateReportData} from "../repository/report.repository";
import {ReportCreateRequestDto} from "../dto/reportCreateRequest.dto";
import { ReportEntity } from "../entity/report.entity";
import {findIdByEmail} from "../repository/account.repository";

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

export const handleReportService = async (reportId: number, adminId: number) => {
    const report = await findReportById(reportId);
    if (!report) {
        throw new Error("Report not found.");
    }
    if (report.isHandled) {
        throw new Error("Report has already been handled.");
    }

    await updateReportData(reportId, adminId, true);
};

export const unHandleReportService = async (reportId: number, adminId: number) => {
    const report = await findReportById(reportId);
    if (!report) {
        throw new Error("Report not found.");
    }
    if (!report.isHandled) {
        throw new Error("Report doesn't have been handled.");
    }

    await updateReportData(reportId, adminId, false);
};