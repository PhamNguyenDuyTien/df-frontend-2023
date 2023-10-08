import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FCProviderProps } from '../types/types'
import { ListBooksType } from '../types/books.type'
import { BooksData } from '../Data/BooksData'

type ListBooksContextTypes = {
  listBooks: ListBooksType
  setListBooks: Dispatch<SetStateAction<ListBooksType>>
}

const ListBooksContext = createContext({} as ListBooksContextTypes)

const ListBooksProvider = ({ children }: FCProviderProps) => {
  const [hydrated, setHydrated] = useState<boolean>(false)

  const [listBooksStorage] = useState<string>(
    (typeof window !== 'undefined' &&
      localStorage.getItem('list-books') !== null &&
      localStorage.getItem('list-books')) ||
      '',
  )

  const [listBooks, setListBooks] = useState<ListBooksType>(
    listBooksStorage !== '' ? JSON.parse(listBooksStorage) : BooksData,
  )

  useEffect(() => {
    localStorage.setItem('list-books', JSON.stringify(listBooks))
  }, [listBooks])

  const contextValue = useMemo(
    () => ({
      listBooks,
      setListBooks,
    }),
    [listBooks, setListBooks],
  )

  // Fixed Hydrated
  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  return (
    <ListBooksContext.Provider value={contextValue}>
      {children}
    </ListBooksContext.Provider>
  )
}

export { ListBooksContext, ListBooksProvider }
