import {CreateBannerDto, toBannerDto, toBannerEntity} from "../dto/banner.dto";
import {Banner} from "../entity/banner.entity";
import {getActiveBanners, saveBanner, updateBannerFields} from "../repository/banner.repository";
import {uploadBannerImageToS3} from "./s3.service";

export async function registerBanner(createBannerDto: CreateBannerDto) {
    const entity: Banner = toBannerEntity(createBannerDto);
    const bannerId = await saveBanner(entity);
    const { url, key } = await uploadBannerImageToS3(createBannerDto.imageUrl, bannerId);
    await updateBannerFields(bannerId, { imageUrl: url, key: key });
    return bannerId;
}

export async function findBanner() {
    const entity = await getActiveBanners();
    if (entity.length === 0) return [];
    return entity.map(toBannerDto);
}