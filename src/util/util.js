/**
 * transforms a filename into a cloudinary url
 * @param {string} filename
 */
export const format_cloudinary_url = filename =>
  `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/v1596108033/image/upload/${filename}`
