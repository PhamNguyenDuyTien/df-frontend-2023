import React, { useContext } from 'react'
import './Layout.scss'
import { BiUserCircle } from 'react-icons/bi'
import { BsMoon, BsSun } from 'react-icons/bs'
import { FCProviderProps, ThemeContext } from '../../Context/ThemeContext'

const Layout = ({ children }: FCProviderProps) => {
  const context = useContext(ThemeContext)
  return (
    <div
      className={
        'layout-container'
        + `${context.theme === "dark" ? " dark" : " light"}`
      }
    >
      <div className="layout-header">
        <div className="layout-header-left">
          <div className="layout-header-left-logo">
            <h1>Bookstore</h1>
          </div>
        </div>
        <div className="layout-header-right">
          <div className="layout-header-right-theme">
            <input
              type="checkbox"
              id="theme-mode"
              checked={context.theme === 'dark'}
              onChange={(e) =>
                context.setTheme(e.target.checked ? 'dark' : 'light')
              }
            />
            <label htmlFor="theme-mode">
              {context.theme === 'dark' ? (
                <BsMoon className="icon-dark" />
              ) : (
                <BsSun className="icon-light" />
              )}
            </label>
          </div>
          <div className="layout-header-right-user">
            <BiUserCircle className="icon-user" />
            <span>NAME</span>
          </div>
        </div>
      </div>
      <div className="layout-main">{children}</div>
    </div>
  )
}

export default Layout
