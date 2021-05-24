/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"
import Header from "./header"
import layoutStyles from "./layout.module.scss"
import sidebarStyles from "./sidebar.module.scss"

import Footer from "./footer"
import footerStyles from "./footer.module.scss"

import email from "../images/social/email.svg"
import facebook from "../images/social/facebook.svg"
import instagram from "../images/social/instagram.svg"
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
      <Helmet>
        <html lang="en" />
        <title>{data.site.siteMetadata.title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={data.site.siteMetadata.title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
          <Sidebar
            width={200}
            height={"100vh"}
            className={sidebarStyles.sidebar}
          >
            <p style={{ fontSize: `small` }}>
              Ecstatic music and collaborations.
              <br />
              Est. 2015, Helsinki, Finland.
            </p>

            <div style={{ justifyContent: `flex-start`, marginBottom: `2rem` }}>
              <img
                src={email}
                width={20}
                alt="email icon"
                style={{ display: `inline` }}
              />
              <sup style={{ fontSize: `0.8rem` }}>biitsiemail@gmail.com</sup>
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
                <a rel="noopener" href="https://www.instagram.com/biitsi_duo/">
                  <img src={instagram} width={25} alt="instagram icon" />
                </a>
              </div>
            </div>
          </Sidebar>
          <div className={layoutStyles.children}>{children}</div>
        </div>
      </div>
      <Footer
        className={footerStyles.footer}
        author={data.site.siteMetadata.author}
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
