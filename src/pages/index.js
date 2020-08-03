import React from "react"
import "../styles/styles.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageGallery from "../components/imageGallery"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Projects" />
      <ImageGallery></ImageGallery>
    </Layout>
  </>
)

export default IndexPage
