import React from "react"
import footerStyles from "./footer.module.scss"

const Footer = props => {
  return (
    <footer className={footerStyles.footer}>
      <sub>
        Built with&nbsp;
        <a href="https://www.gatsbyjs.org" target="_blank" rel="noreferrer">
          Gatsby
        </a>
        &nbsp; and&nbsp;
        <a href="https://www.netlifycms.org" target="_blank" rel="noreferrer">
          Netlify
        </a>
        . Site by&nbsp;
        <a href="https://jenchan.biz" target="_blank" rel="noreferrer">
          {props.author}
        </a>
      </sub>
    </footer>
  )
}

export default Footer
