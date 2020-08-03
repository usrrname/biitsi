import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Artwork = () => {
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
    <main>
      <div
        className="content"
        itemScope
        itemprop="workExample"
        itemType="https://schema.org/exampleOfWork"
      >
        <Img src={image.secure_url} width={image.width} />
        <p itemprop="name">Title</p>
        <time itemprop="datePublished" date={date}>
          Year
        </time>
      </div>
    </main>
  )
}
export default Artwork
