require("dotenv").config({ path: ".env" })
const cloudinary = require("cloudinary").v2
const snakeCase = require("lodash.snakecase")

const newCloudinary = options => {
  cloudinary.config({
    cloud_name: options.cloud_name,
    api_key: options.api_key,
    api_secret: options.api_secret,
  })
  return cloudinary
}

const DEFAULT_KEYS = [
  "resourceType",
  "prefix",
  "tags",
  "maxResults",
  "type",
  "context",
]
const DEFAULT_TYPE = "upload"

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

const type = `CloudinaryMedia`

const getNodeData = (gatsby, media) => {
  return {
    ...media,
    id: gatsby.createNodeId(`cloudinary-media-${media.public_id}`),
    parent: null,
    internal: {
      type,
      content: JSON.stringify(media),
      contentDigest: gatsby.createContentDigest(media),
    },
  }
}

const createCloudinaryNodes = (gatsby, cloudinary, options) => {
  return cloudinary.api.resources(options, (error, result) => {
    const hasResources = result && result.resources && result.resources.length

    if (error) {
      console.error(error)
      return
    }

    if (!hasResources) {
      console.warn(
        "\n ~Yikes! No nodes created because no Cloudinary resources found. Try a different query?"
      )
      return
    }

    result.resources.forEach(resource => {
      const transformations = "q_auto,f_auto" // Default CL transformations

      resource.url = addTransformations(resource, transformations)
      resource.secure_url = addTransformations(resource, transformations, true)

      const nodeData = getNodeData(gatsby, resource)
      gatsby.actions.createNode(nodeData)
    })

    console.info(
      `Added ${hasResources} CloudinaryMedia ${
        hasResources > 1 ? "nodes" : "node"
      }`
    )
  })
}

exports.sourceNodes = (gatsby, options) => {
  const cloudinary = newCloudinary(options)
  const resourceOptions = getResourceOptions(options)

  return createCloudinaryNodes(gatsby, cloudinary, resourceOptions)
}
