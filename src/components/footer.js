import React from "react"

const Footer = () => {
  return (
    <footer>
      <sub>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org" target="_blank" rel="noreferrer">
          Gatsby
        </a>{" "}
        and{" "}
        <a href="https://www.netlifycms.org" target="_blank" rel="noreferrer">
          Netlify
        </a>
      </sub>
    </footer>
  )
}

export default Footer
