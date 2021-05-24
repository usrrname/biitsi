import sidebarStyles from "./sidebar.module.scss"
import React from "react"

export const Sidebar = ({ width, height, children }) => {
  return (
    <>
      <aside
        className={sidebarStyles.sidebar}
        style={{
          width: width,
          height: height
        }}
      >
        <div className={sidebarStyles.iconContainer}>{children}</div>
      </aside>
    </>
  )
}
export default Sidebar
