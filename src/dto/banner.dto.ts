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
  adminId: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
  visible: boolean;
  priority: number;
  startsAt: Date;
  endsAt: Date;
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

export function toBannerDto(banner: Banner, imageUrl: string): GetBannerDto {
  return {
    id: banner.id,
    adminId: banner.adminId,
    title: banner.title,
    imageUrl: imageUrl,
    linkUrl: banner.linkUrl,
    visible: banner.visible,
    priority: banner.priority,
    startsAt: banner.startsAt,
    endsAt: banner.endsAt,
  }
}