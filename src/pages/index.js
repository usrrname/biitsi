import React from "react"
import "../styles/styles.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectRoll from "../components/projectRoll"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Projects" />
      <ProjectRoll />
    </Layout>
  </>
)
export default IndexPage
