import "./sidebar.module.scss"
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
        className="sidebar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height,
          paddingLeft: 16,
        }}
      >
        <div role="button" onClick={() => toggleMenu()} className="toggle-menu">
          <img
            src={paperclip}
            width={35}
            alt="paper clip"
            style={{
              transform: `translate(${width}px, 20vh)`,
            }}
          ></img>
        </div>
        <div className="content">{children}</div>
      </aside>
    </>
  )
}

export default Sidebar
