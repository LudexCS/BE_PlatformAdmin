import AppDataSource from "../config/mysql.config";
import { ReportEntity } from "../entity/report.entity";

const reportRepo = AppDataSource.getRepository(ReportEntity);

export const findReports = async (handled: boolean, offset: number, limit: number) => {
    return await reportRepo
        .createQueryBuilder("report")
        .where("report.ishandled = :handled", { handled })
        .orderBy("report.reported_at", "DESC")
        .skip(offset)
        .take(limit)
        .getMany();
};

export const saveReport = async (report: ReportEntity): Promise<ReportEntity> => {
    return await reportRepo.save(report);
};

export const updateReportAsHandled = async (reportId: number, adminId: number) => {
    await reportRepo.update(
        { id: reportId },
        {
            isHandled: true,
            handledAt: new Date(),
            handledAdminId: adminId,
        }
    );
};

export const findReportById = async (reportId: number) => {
    return await reportRepo.findOneBy({ id: reportId });
};