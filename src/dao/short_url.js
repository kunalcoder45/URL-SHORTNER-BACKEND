import ShortUrl from "../models/short_url.model.js";
import AppError from "../utils/AppError.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new ShortUrl({
            full_url: longUrl,
            short_url: shortUrl
        });

        if (userId) {
            newUrl.userId = userId;
        }

        await newUrl.save();
    } catch (err) {
        throw new AppError("Error saving short URL to database", 500);
    }
};

export const getShorturl = async (shortUrl) => {
    try {
        const url = await ShortUrl.findOneAndUpdate(
            { short_url: shortUrl },
            { $inc: { clicks: 1 } },
            { new: true }
        );

        return url;
    } catch (err) {
        throw new AppError("Error retrieving short URL from database", 500);
    }
};
