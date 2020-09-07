// Load the environment variables.
const dotenv = require("dotenv")
dotenv.config({ path: ".env" })

module.exports = {
  siteMetadata: {
    title: `Biitsi`,
    description: `Helsinki-based production duo Biitsi`,
    author: `Jen Chan`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-plugin-netlify-cms-paths`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/pages/_projects/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `press`,
        path: `${__dirname}/src/pages/_press/`,
      },
    },
    {
      resolve: "gatsby-remark-copy-linked-files",
      options: {
        destinationDir: "static",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        prefix: `bcloud/`,
        maxResults: 40,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify-cms-paths`,
    {
      resolve: `gatsby-plugin-netlify-cms-paths`,
      options: {
        // Path to your Netlify CMS config file
        cmsConfig: `/static/admin/config.yml`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://biitsi.org/.netlify/identity`, // required!
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ],
}
