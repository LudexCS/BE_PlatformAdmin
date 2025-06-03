import {CreateBannerDto} from "../dto/banner.dto";
import {findBanner, registerBanner} from "../service/banner.service";

export async function createBannerControl(createBannerDto: CreateBannerDto) {
    return await registerBanner(createBannerDto);
}

export async function getBannerControl() {
    return await findBanner();
}