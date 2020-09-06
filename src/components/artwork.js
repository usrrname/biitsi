import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Artwork = data => {
  const image = useStaticQuery(graphql`
    {
      cloudinaryMedia {
        public_id
        secure_url
        width
      }
    }
  `)
  return (
    <div>
      <div
        className="content"
        itemScope
        itemprop="workExample"
        itemType="https://schema.org/exampleOfWork"
      >
        <Img
          fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid}
          alt={data.markdownRemark.frontmatter.title}
        />
        <p itemprop="name">Title</p>
        <time itemprop="datePublished" date={date}>
          Year
        </time>
      </div>
    </div>
  )
}
export default Artwork
