import React from "react"
import footerStyles from "./footer.module.scss"

const Footer = props => {
  return (
    <footer className={footerStyles.footer}>
      <sub>
        Built with{" "}
        <a href="https://www.gatsbyjs.org" target="_blank" rel="noreferrer">
          Gatsby
        </a>{" "}
        and
        <a href="https://www.netlifycms.org" target="_blank" rel="noreferrer">
          Netlify
        </a>
        . Site by{" "}
        <a href="https://jenchan.biz" target="_blank" rel="noreferrer">
          {props.author}
        </a>
      </sub>
    </footer>
  )
}

export default Footer
