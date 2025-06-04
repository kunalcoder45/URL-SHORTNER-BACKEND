import { getShorturl } from "../dao/short_url.js";
import { createShortUrlWithoutUser } from "../services/short_url.js";
import AppError from "../utils/AppError.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) throw new AppError("URL is required", 400);

    const shortUrl = await createShortUrlWithoutUser(url);
    res.status(201).send(`${process.env.APP_URL}/${shortUrl}`);
  } catch (err) {
    next(err);
  }
};


export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await getShorturl(id);

    if (!url) throw new AppError("Short URL not found", 404);

    console.log("Redirecting to:", url.full_url); // Add this line
    res.redirect(url.full_url);
  } catch (err) {
    next(err);
  }
};
