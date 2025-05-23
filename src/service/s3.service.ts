import { S3 } from "../config/s3.config";
import {GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';
import { readFile } from 'fs/promises';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export const uploadBannerImageToS3 = async (
    image: { path: string; mimetype: string },
    bannerId: number
): Promise<{ url:string, key:string }> => {
    const buffer = await readFile(image.path);
    const key = `banners/${bannerId}/${uuidv4()}${image.path.substring(image.path.lastIndexOf('.'))}`;

    try {
        await S3.send(new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
            Body: buffer,
            ContentType: image.mimetype,
            CacheControl: "public, max-age=604800",
            ACL: "public-read"
        }));
    } catch (error) {
        console.error("S3 upload error:", error);
        throw new Error("Failed to upload banner image to S3");
    }

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { url, key };
};
/*
export async function getBannerPresignedUrl(key: string): Promise<string> {
    const expiresInSec = 60;

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        });

        return await getSignedUrl(S3, command, { expiresIn: expiresInSec });
    } catch (error) {
        console.error("Failed to generate presigned banner URL:", error);
        throw new Error("Failed to generate presigned banner URL");
    }
}
*/