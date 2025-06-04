import {getReports, createReport, handleReportService, unHandleReportService} from "../service/report.service";
import {Request, Response} from "express";
import {ReportCreateRequestDto} from "../dto/reportCreateRequest.dto";

export const getReportControl = async(handled: boolean, page: number) => {
    return getReports(handled, page);
}

export const createReportControl = async (userId: number, dto: ReportCreateRequestDto) => {
        return await createReport(dto, userId);
};

export const handleReportControl = async (reportId: number, adminId: number) => {
    if (!reportId || !adminId) {
        throw new Error("Missing reportId or admin identity.");
    }

    await handleReportService(reportId, adminId);
};

export const unHandleReportControl = async (reportId: number, adminId: number) => {
    if (!reportId || !adminId) {
        throw new Error("Missing reportId or admin identity.");
    }
    await unHandleReportService(reportId, adminId);
}