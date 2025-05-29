import AppDataSource from "../config/mysql.config";


const reportRepo = AppDataSource.getRepository(Report);

export const findReports = async (handled: boolean, offset: number, limit: number) => {
    return await reportRepo
        .createQueryBuilder("report")
        .where("report.ishandled = :handled", { handled })
        .orderBy("report.reported_at", "DESC")
        .skip(offset)
        .take(limit)
        .getMany();
};

export const saveReport = async (report: Report): Promise<Report> => {
    return await reportRepo.save(report);
};