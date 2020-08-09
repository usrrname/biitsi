import React from "react"

import Layout from "../components/Layout"
import PressRoll from "../components/PressRoll"
import SEO from "../components/seo"

const Press = () => (
  <Layout>
    <SEO title="Press" />
    <section className="section">
      <div className="container">
        <div className="content">
          <PressRoll />
        </div>
      </div>
    </section>
  </Layout>
)

export default Press
