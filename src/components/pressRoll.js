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
            <div
              key={post.id}
              style={{
                marginRight: `25vw`,
                marginBottom: `3rem`,
              }}
            >
              <article>
                <header>
                  <h4 style={{ color: `var(--periwinkle)` }}>
                    {post.frontmatter.title}
                    &nbsp;
                    <span>{post.frontmatter.date}</span>
                  </h4>
                </header>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.html,
                  }}
                ></div>
                <Link
                  to={post.fields.slug}
                  style={{
                    color: `var(--treshaute)`,
                    backgroundColor: `var(--blush)`,
                  }}
                >
                  <h4
                    style={{
                      textAlign: `right`,
                    }}
                  >
                    Read More &#128214;
                  </h4>
                </Link>
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
      query PressRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
          filter: { frontmatter: { templateKey: { eq: "press-post" } } }
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
