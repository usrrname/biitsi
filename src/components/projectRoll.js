import React, { Component } from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
class ProjectRoll extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <div className="container">
        {posts &&
          posts.map(({ node: post }) => (
            <section key={post.id}>
              <h2>{post.frontmatter.title}</h2>
              <p>{post.frontmatter.year}</p>
              <p>{post.frontmatter.body}</p>
              <img src={post.frontmatter.image} />
              <div
                dangerouslySetInnerHTML={{
                  __html: post.html,
                }}
              ></div>
            </section>
          ))}
      </div>
    )
  }
}

ProjectRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ProjectRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "project-post" } } }
        ) {
          edges {
            node {
              id
              html
              fields {
                slug
              }
              frontmatter {
                title
                year
                date
                image
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ProjectRoll data={data} count={count} />}
  />
)
