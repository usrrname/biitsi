const cloudinary = require("cloudinary").v2
const snakeCase = require("lodash.snakecase")

const DEFAULT_KEYS = [
  "resourceType",
  "prefix",
  "tags",
  "maxResults",
  "type",
  "context",
]
const DEFAULT_TYPE = "upload"

const newCloudinary = options => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  return cloudinary
}

const getResourceOptions = options => {
  let result = {}

  DEFAULT_KEYS.forEach(key => {
    if (typeof options[key] !== "undefined") {
      result[snakeCase(key)] = options[key]
    }
  })

  result.type = result.type || DEFAULT_TYPE

  return result
}

module.exports = {
  newCloudinary,
  getResourceOptions,
}
