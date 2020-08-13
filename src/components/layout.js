/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header"
import layoutStyles from "./layout.module.scss"

import Footer from "./Footer"
import email from "../images/social/email.svg"
import facebook from "../images/social/facebook.svg"
import instagram from "../images/social/instagram.svg"
import soundcloud from "../images/social/soundcloud.png"
import Sidebar from "./Sidebar"

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
      <div className={layoutStyles.container}>
        <main className={layoutStyles.content}>
          <Sidebar width={"100vw"} height={"30vh"}>
            <article>
              <p>
                Ecstatic music and collaborations. Est. 2015, Helsinki, Finland.
              </p>
            </article>
            <div>
              <div className={layoutStyles.link}>
                <img src={email} width={25} alt="email icon" />{" "}
                <span className="email">biitsiemail@gmail.com</span>
              </div>
            </div>

            <div className="iconContainer">
              <div>
                <a
                  rel="noopener"
                  href="https://www.facebook.com/biitsihelsinki/"
                >
                  <img src={facebook} width={25} alt="facebook icon" />
                </a>
              </div>
              <div>
                <a rel="noopener" href="https://soundcloud.com/biitsi/tracks">
                  <img src={soundcloud} width={25} alt="soundclound icon" />
                </a>
              </div>
              <div>
                <a rel="noopener" href="https://www.instagram.com/biitsiband/">
                  <img src={instagram} width={25} alt="instagram icon" />
                </a>
              </div>
            </div>
          </Sidebar>

          {children}
        </main>
      </div>
      <Footer author={data.site.siteMetadata.author} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
