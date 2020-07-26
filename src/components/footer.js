import React from "react"

const Footer = props => {
  return (
    <footer>
      <sub>
        Built with
        {` `}
        <a href="https://www.gatsbyjs.org" target="_blank" rel="noreferrer">
          Gatsby
        </a>{" "}
        and{" "}
        <a href="https://www.netlifycms.org" target="_blank" rel="noreferrer">
          Netlify
        </a>
        . Site by {props.author}
      </sub>
    </footer>
  )
}

export default Footer
