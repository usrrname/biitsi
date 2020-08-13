import React, { Component } from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { Img } from "gatsby-image"

class ProjectRoll extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <div>
        {posts &&
          posts.map(({ node: post }) => (
            <section key={post.id}>
              <h2>{post.frontmatter.title}</h2>
              <p>{post.frontmatter.year}</p>
              <Img src={post.frontmatter.image} fluid />
              <div
                dangerouslySetInnerHTML={{
                  __html: post.text,
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
      query PressRollQuery {
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
                text
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
