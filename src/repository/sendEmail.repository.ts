import AppDataSource from '../config/mysql.config';
import { SendedEmail } from '../entity/sendedEmail.entity';

export const insertEmailLog = async (
    adminId: number,
    receiverId: number,
    content: string
) => {
    const repo = AppDataSource.getRepository(SendedEmail);
    const record = repo.create({
        adminId: adminId,
        receiverId: receiverId,
        sendedDetails: content,
    });
    await repo.save(record);
};
