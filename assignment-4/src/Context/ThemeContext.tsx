import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FCProviderProps } from '../types/types'

// Define context types
type ThemeContextTypes = {
  theme: string
  styles: string
  bgStyles: string
  setTheme: Dispatch<SetStateAction<string>>
}

// Create Context
const ThemeContext = createContext({} as ThemeContextTypes)

const ThemeProvider = ({ children }: FCProviderProps) => {
  const [hydrated, setHydrated] = useState<boolean>(false)
  const [themeStorage] = useState<string>(
    (typeof window !== 'undefined' && localStorage.getItem('theme') !== null
      ? localStorage.getItem('theme')
      : '') || 'light',
  )

  const [theme, setTheme] = useState<string>(themeStorage)
  const [styles, setStyles] = useState<string>('text-white')
  const [bgStyles, setBgStyles] = useState<string>('bg-white')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      setStyles('text-white')
      setBgStyles('bg-black')
    } else {
      setStyles('text-black')
      setBgStyles('bg-white')
    }
  }, [theme])

  const contextValue = useMemo(
    () => ({
      theme,
      styles,
      bgStyles,
      setTheme,
    }),
    [theme, bgStyles, setTheme, styles],
  )

  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
