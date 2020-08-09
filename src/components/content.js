import React from "react"
import PropTypes from "prop-types"
import { toHTML } from "../util/util"

export const HTMLContent = ({ content, className }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: toHTML(content) }}
  />
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
