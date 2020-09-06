import React from "react"
import PropTypes from "prop-types"

export const HTMLContent = ({ html, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
)

export const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
