import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import Content from "../components/Content"
import Layout from "../components/Layout"
export const PressTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
}) => {
  const PressContent = contentComponent || Content
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
  const { content, frontmatter, contentComponent, text } = data.markdownRemark

  return (
    <Layout>
      <PressTemplate
        content={content}
        contentComponent={contentComponent}
        description={text}
        helmet={
          <Helmet titleTemplate="%s | Press">
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.content}`} />
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
      frontmatter {
        title
        date
        tags
        image
      }
    }
  }
`
