import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import headerStyles from "./header.module.scss"
const Header = ({ siteTitle }) => {
  return (
    <header className={headerStyles.header}>
      <h3>
        <Link to="/">{siteTitle}</Link>
      </h3>
      <h3>
        <Link to="/press/">Press</Link>
      </h3>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `biitsi`,
}

export default Header
