import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"

class PressRoll extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div>
        {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
              <article>
                <header>
                  <p>
                    <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                    <span>{post.frontmatter.date}</span>
                  </p>
                </header>
                <p>
                  {post.text}
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

PressRoll.propTypes = {
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
          filter: { frontmatter: { templateKey: { eq: "press-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date
                text
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PressRoll data={data} count={count} />}
  />
)
