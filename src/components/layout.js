/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import layoutStyles from "./layout.module.scss"
import Footer from "./footer"
import facebook from "../images/social/facebook.svg"
import instagram from "../images/social/instagram.svg"
import vimeo from "../images/social/vimeo.svg"
import soundcloud from "../images/social/soundcloud.png"
import Sidebar from "./sidebar"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Sidebar width={200} height={"100vh"} className="sidebar">
        <p>
          Ecstatic music and collaborations.<br></br>Est. 2015, Helsinki,
          Finland.
        </p>
        <a
          className="gatsby-responsive-link"
          rel="noopener"
          alt="contact by email"
        >
          biitsiemail@gmail.com
        </a>
        <a rel="noopener" href="https://www.facebook.com/biitsihelsinki/" className="social-media-icons">
          <img src={facebook} width={25} alt="facebook icon" />
        </a>
        <a rel="noopener" href="" className="social-media-icons">
          <img src={vimeo} width={25} alt="vimeo icon" />
        </a>
        <a rel="noopener" href="https://soundcloud.com/biitsi/tracks" className="social-media-icons">
          <img src={soundcloud} width={25} alt="soundclound icon" />
        </a>
        <a rel="noopener" href="https://www.instagram.com/biitsiband/" className="social-media-icons">
          <img src={instagram} width={25} alt="instagram icon" />
        </a>
      </Sidebar>
      <div className={layoutStyles.container}>
        <main className={layoutStyles.content}>{children}</main>
      </div>
      <Footer author={data.site.siteMetadata.author} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
