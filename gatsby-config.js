// Load the environment variables.
const dotenv = require("dotenv")
dotenv.config({ path: ".env" })

module.exports = {
  siteMetadata: {
    title: `Bitsii`,
    description: `Helsinki-based production duo Biitsi`,
    author: `Jen Chan`,
  },
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2000,
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
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
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    `gatsby-plugin-sass`,
  ],
}
