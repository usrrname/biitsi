import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import HTMLContent from "../components/content"
import Layout from "../components/layout"

export const PressTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
}) => {
  const PressContent = contentComponent || HTMLContent
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div>
          <h1>{title}</h1>
          <PressContent content={content} />
          {tags && tags.length ? (
            <div>
              <h3>Tags</h3>
              <ul className="taglist">
                {tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

PressTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const PressPost = ({ data }) => {
  const { html, frontmatter, contentComponent, excerpt } = data.markdownRemark

  return (
    <Layout>
      <PressTemplate
        content={html}
        contentComponent={contentComponent}
        description={excerpt}
        helmet={
          <Helmet titleTemplate="%s | Press">
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={excerpt} />
          </Helmet>
        }
        tags={frontmatter.tags}
        title={frontmatter.title}
      />
    </Layout>
  )
}

PressPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default PressPost

export const data = graphql`
  query PressPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      frontmatter {
        title
        date
        tags
        image
      }
      parent {
        internal {
          content
        }
      }
    }
  }
`
