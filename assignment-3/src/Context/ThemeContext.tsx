import {
  useState,
  createContext,
  useEffect,
  ReactNode,
  Dispatch,
  useMemo,
} from 'react'

// Định nghĩa type context cần truyền
type ThemeContextType = {
  theme: string
  setTheme: Dispatch<React.SetStateAction<string>>
}
// Tạo context từ type định nghĩa phía trên
const ThemeContext = createContext({} as ThemeContextType)

export type FCProviderProps = {
  children: ReactNode
}

const ThemeProvider = ({ children }: FCProviderProps) => {
  const themeStorage: string = localStorage.getItem('theme') || 'light'
  const [theme, setTheme] = useState<string>(themeStorage)

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
