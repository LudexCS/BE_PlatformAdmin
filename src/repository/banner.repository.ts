import {Banner} from "../entity/banner.entity";
import {Repository, LessThanOrEqual, MoreThanOrEqual} from "typeorm";
import AppDataSource from "../config/mysql.config";

const bannerRepo: Repository<Banner> = AppDataSource.getRepository(Banner);

export async function saveBanner(banner: Banner) {
    try {
        return (await bannerRepo.save(banner)).id;
    } catch (error) {
        console.error("Failed to save banner:", error);
        throw new Error("Failed to save the banner.");
    }
}

export const updateBannerFields = async (
    bannerId: number,
    partialUpdate: Partial<Banner>
): Promise<void> => {
    try {
        await bannerRepo.update({ id: bannerId }, partialUpdate);
    } catch (error) {
        console.error("Failed to update banner fields:", error);
        throw new Error("Failed to update banner fields in database");
    }
};

export const getActiveBanners = async () => {
    try {
        const now = new Date();
        return await bannerRepo.find({
            select: ["id", "title", "imageUrl", "linkUrl"],
            where: {
                visible: true,
                startsAt: LessThanOrEqual(now),
                endsAt: MoreThanOrEqual(now)
            },
            order: {
                priority: "ASC"
            }
        });
    } catch (error) {
        console.error("Failed to get active banners:", error);
        return [];
    }
};
