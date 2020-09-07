import React from "react"
import "../styles/styles.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectRoll from "../components/projectRoll"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Projects" />
      <section className="section">
      <div className="container">
        <div className="content">
      <ProjectRoll />
      </div>
      </div>
      </section>
    </Layout>
  </>
)
export default IndexPage
