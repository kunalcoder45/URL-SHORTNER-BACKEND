import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";
import AppError from "../utils/AppError.js";

export const createShortUrlWithoutUser = async (url) => {
    try {
        const shortUrl = generateNanoId(7);
        await saveShortUrl(shortUrl, url);
        return shortUrl;
    } catch (err) {
        throw new AppError("Failed to create short URL without user", 500);
    }
};

export const createShortUrlWithUser = async (url, userId) => {
    try {
        const shortUrl = generateNanoId(7);
        await saveShortUrl(url, shortUrl, userId)
        return shortUrl;
    } catch (err) {
        throw new AppError("Failed to create short URL with user", 500);
    }
};