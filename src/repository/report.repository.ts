import AppDataSource from "../config/mysql.config";
import { ReportEntity } from "../entity/report.entity";

const reportRepo = AppDataSource.getRepository(ReportEntity);

export const findReports = async (handled: boolean, offset: number, limit: number) => {
    return await reportRepo
        .createQueryBuilder("report")
        .leftJoinAndSelect("account", "complainant", "report.complainantId = complainant.id")
        .leftJoinAndSelect("game", "reportedGame", "report.reportedGameId = reportedGame.id")
        .leftJoinAndSelect("account", "creator", "reportedGame.userId = creator.id")
        .where("report.ishandled = :handled", { handled })
        .orderBy("report.reported_at", "DESC")
        .skip(offset)
        .take(limit)
        .select([
            "report",
            "complainant.nickname",
            "reportedGame.title",
            "creator.nickname"
        ])
        .getRawMany();
};

export const saveReport = async (report: ReportEntity): Promise<ReportEntity> => {
    return await reportRepo.save(report);
};

export const updateReportData = async (reportId: number, adminId: number, isHandled: boolean) => {
    await reportRepo.update(
        { id: reportId },
        {
            isHandled: isHandled,
            handledAt: new Date(),
            handledAdminId: adminId,
        }
    );
};

export const findReportById = async (reportId: number) => {
    return await reportRepo.findOneBy({ id: reportId });
};