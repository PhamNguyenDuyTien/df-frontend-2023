import React, { ChangeEvent, useContext } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'
import { BiUserCircle } from 'react-icons/bi'
import Link from 'next/link'
import { FCProviderProps } from '../../types/types'
import { ThemeContext } from '../../Context/ThemeContext'
import Styles from './LayoutBookstore.module.css'

const LayoutBookstore = ({ children }: FCProviderProps) => {
  const context = useContext(ThemeContext)
  const handleChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    context.setTheme(e.target.checked ? 'dark' : 'light')
  }
  return (
    <div
      className={
        'w-full h-[100vh] ' +
        `${
          context.theme === 'dark' ? `${Styles['dark']}` : `${Styles['light']}`
        }`
      }
    >
      <header className="flex justify-between items-center px-3 h-[60px] border-b border-gray-2">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-semibold">Bookstore</h1>
        </Link>
        <div className="flex items-center max-w-[180px] w-full">
          <div className="relative">
            <input
              type="checkbox"
              id="theme-mode"
              className={Styles['theme-mode']}
              checked={context.theme === 'dark'}
              onChange={handleChangeTheme}
            />
            <label className={Styles['label-theme-mode']} htmlFor="theme-mode">
              {context.theme === 'dark' ? (
                <BsMoon className={Styles['icon-dark']} />
              ) : (
                <BsSun className={Styles['icon-light']} />
              )}
            </label>
          </div>
          <div className="flex items-center">
            <BiUserCircle className={Styles['icon-user']} />
            <span>NAME</span>
          </div>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}

export default LayoutBookstore
