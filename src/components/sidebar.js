import sidebarStyles from "./sidebar.module.scss"
import React, { useState, useEffect } from "react"
import paperclip from "../images/paperclip.svg"
export const Sidebar = ({ width, height, children }) => {
  const [xPosition, setX] = useState(-width)

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0)
    } else {
      setX(-width)
    }
  }

  useEffect(() => {
    setX(0)
  }, [])
  return (
    <>
      <aside
        className={sidebarStyles.sidebar}
        style={{
          transform: `translateX(${xPosition}px)`,
          width: width,
          height: height,
        }}
      >
        <div
          role="button"
          tabIndex="0"
          onClick={() => toggleMenu()}
          className={sidebarStyles.toggleMenu}
        >
          <img
            src={paperclip}
            width={35}
            alt="paper clip"
            style={{
              transform: `translate(${width}px, 20vh)`,
            }}
          ></img>
        </div>
        <div className={sidebarStyles.iconContainer}>{children}</div>
      </aside>
    </>
  )
}
export default Sidebar
