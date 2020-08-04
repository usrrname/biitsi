import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import { Helmet } from "react-helmet"
import { graphql, Link, StaticQuery } from "gatsby"
import Content, { HTMLContent } from "../components/Content"
import Layout from "../components/Layout"

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
        <div dangerouslySetInnerHTML={{ __html: HTMLContent }}></div>
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
  const { content, frontmatter, contentComponent } = data.markdownRemark

  return (
    <Layout>
      <ProjectTemplate
        title={frontmatter.title}
        content={content}
        contentComponent={contentComponent}
        description={frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Project">
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.excerpt}`} />
          </Helmet>
        }
        tags={frontmatter.tags}
      />
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
        description
        tags
        year
      }
    }
  }
`
