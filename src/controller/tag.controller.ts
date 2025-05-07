import {Request} from 'express';
import {editTag, findTag, registerTag, removeTag} from "../service/tag.service";
import {TagDto} from "../dto/tag.dto";

export const createTagControl = async (req: Request) => {
    try {
        const tagName = req.body.name;
        if (typeof tagName !== 'string' || tagName.trim() === '') {
            throw new Error("Name field is required");
        }
        return await registerTag(tagName);
    } catch (error) {
        throw error;
    }
};

export const updateTagControl = async (req: Request) => {
    try {
        const tagDto: TagDto = req.body;
        if (typeof tagDto !== 'object' || tagDto === null) {
            throw new Error("Invalid request body.");
        }
        if (tagDto.id === undefined) throw new Error("ID field is required.");
        if (tagDto.name === undefined) throw new Error("Name field is required.");
        await editTag(tagDto);
    } catch (error) {
        throw error;
    }
}

export const deleteTagControl = async (req: Request) => {
    try {
        const id = typeof req.body === 'object' && req.body !== null ? req.body.id : undefined;

        if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid input: 'id' field is required and must be a positive integer.");
        }

        await removeTag(id);
    } catch (error) {
        console.error("Failed to remove tag:", error);
        throw error;
    }
}

export const getTagControl = async () => {
    try {
        return await findTag();
    } catch (error) {
        throw error;
    }
}