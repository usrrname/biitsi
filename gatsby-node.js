const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const { toHTML } = require("util/util")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            html
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const slug = edge.node.fields.slug
      createPage({
        path: slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id: edge.node.id,
          html: edge.node.html,
          slug: slug,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag: tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// cloudinary img delivery
const {
  newCloudinary,
  getResourceOptions,
} = require("./src/util/cloudinary_util")
const { node } = require("prop-types")
const type = `cloudinaryMedia`

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

const addTransformations = (resource, transformation, secure) => {
  const splitURL = secure
    ? resource.secure_url.split("/")
    : resource.url.split("/")
  splitURL.splice(6, 0, transformation)

  const transformedURL = splitURL.join("/")
  return transformedURL
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
