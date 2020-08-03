import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import Content, { HTMLContent } from "../components/Content"
import Layout from "../components/Layout"

export const PressTemplate = ({
  content,
  contentComponent,
  description,
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
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <PressContent content={content} />
            {tags && tags.length ? (
              <div>
                <h4>Tags</h4>
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
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PressTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Press">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
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

export const pageQuery = graphql`
  query PressPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date
        title
        description
        tags
      }
    }
  }
`
