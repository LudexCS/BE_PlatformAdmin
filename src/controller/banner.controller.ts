import {CreateBannerDto, UpdateBannerDto} from "../dto/banner.dto";
import {
    adminFindBanner,
    deleteBannerService,
    findBanner,
    registerBanner,
    updateBannerService
} from "../service/banner.service";

export async function createBannerControl(createBannerDto: CreateBannerDto) {
    return await registerBanner(createBannerDto);
}

export async function getBannerControl() {
    return await findBanner();
}

export async function deleteBannerControl(bannerId: number) {
    await deleteBannerService(bannerId);
}

export async function updateBannerControl(bannerId: number, dto: UpdateBannerDto) {
    await updateBannerService(bannerId, dto);
}

export async function adminGetBannerControl() {
    return await adminFindBanner();
}