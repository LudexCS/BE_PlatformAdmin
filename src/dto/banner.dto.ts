import {Banner} from "../entity/banner.entity";

export interface CreateBannerDto {
  adminId?: number;
  title: string;
  imageUrl: {
    path: string;
    mimetype: string;
  };
  linkUrl: string;
  visible: boolean;
  priority: number;
  startsAt: Date;
  endsAt: Date;
}

export interface GetBannerDto {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

export function toBannerEntity(dto: CreateBannerDto): Banner {
  const banner = new Banner();
  if(dto.adminId) banner.adminId = dto.adminId;
  banner.title = dto.title;
  banner.linkUrl = dto.linkUrl;
  banner.visible = dto.visible;
  banner.priority = dto.priority;
  banner.startsAt = dto.startsAt;
  banner.endsAt = dto.endsAt;
  banner.createdAt = new Date();
  banner.updatedAt = new Date();
  return banner;
}

export function toBannerDto(banner: Banner): GetBannerDto {
  return {
    id: banner.id,
    title: banner.title,
    imageUrl: banner.imageUrl,
    linkUrl: banner.linkUrl,
  }
}