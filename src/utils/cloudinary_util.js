/**
 * transforms a filename into a cloudinary url
 * @param {string} filename
 */
export const format_cloudinary_url = filename =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${filename}`
