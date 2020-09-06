import remark, { remarkHTML } from "remark"
/**
 * transforms a filename into a cloudinary url
 * @param {string} filename
 */
export const format_cloudinary_url = filename =>
  `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/v1596108033/image/upload/${filename}`

/**
 * transforms a markdown into html
 * @param {string} value
 */
export const toHTML = value =>
  remark().use(remarkHTML).processSync(value).toString()
