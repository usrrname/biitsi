import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"

class PressRoll extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
              <article>
                <header>
                  <p className="post-meta">
                    <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                    <span>{post.frontmatter.date}</span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
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
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PressRoll data={data} count={count} />}
  />
)
