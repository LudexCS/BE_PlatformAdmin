import AppDataSource from "../config/mysql.config";

export const findReports = async (handled: boolean, offset: number, limit: number) => {
    return await AppDataSource.getRepository(Report)
        .createQueryBuilder("report")
        .where("report.ishandled = :handled", { handled })
        .orderBy("report.reported_at", "DESC")
        .skip(offset)
        .take(limit)
        .getMany();
};