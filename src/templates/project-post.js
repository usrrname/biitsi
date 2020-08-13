import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import Content from "../components/content"
import Layout from "../components/layout"

export const ProjectTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const ProjectContent = contentComponent || Content
  return (
    <section>
      {helmet || ""}
      <div className="container content">
        <h1>{title}</h1>
        <article>{description}</article>
        <ProjectContent content={content} />
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
    </section>
  )
}

ProjectTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ProjectPost = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <ProjectTemplate
        title={post.frontmatter.title}
        content={post.content}
        contentComponent={post.contentComponent}
        description={post.frontmatter.text}
        helmet={
          <Helmet titleTemplate="%s | Project">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.content}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
      />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

ProjectPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProjectPost

export const data = graphql`
  query ProjectPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        text
        image
        tags
        year
      }
    }
  }
`
