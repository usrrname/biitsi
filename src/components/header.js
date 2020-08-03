import { Link } from "gatsby"
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

export default Header
