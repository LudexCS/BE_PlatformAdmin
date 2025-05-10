import {CreateBannerDto, toBannerDto, toBannerEntity} from "../dto/banner.dto";
import {Banner} from "../entity/banner.entity";
import {getActiveBanners, saveBanner, updateBannerFields} from "../repository/banner.repository";
import {getBannerPresignedUrl, uploadBannerImageToS3} from "./s3.service";

export async function registerBanner(createBannerDto: CreateBannerDto) {
    const entity: Banner = toBannerEntity(createBannerDto);
    const bannerId = await saveBanner(entity);
    const key = await uploadBannerImageToS3(createBannerDto.imageUrl, bannerId);
    entity.imageUrl = key;
    await updateBannerFields(bannerId, { imageUrl: key });
    return bannerId;
}

export async function findBanner() {
    const entity = await getActiveBanners();
    return await Promise.all(entity.map(async banner => {
        const key = banner.imageUrl;
        const url = await getBannerPresignedUrl(key);
        return toBannerDto(banner, url);
    }));
}