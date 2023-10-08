'use client'

import { ListBooksProvider, ThemeProvider } from '../Context'
import { BooksData } from '../Data/BooksData'
import Bookstore from '../components/Bookstore/Bookstore'
import LayoutBookstore from '../components/LayoutBookstore/LayoutBookstore'

if (typeof window !== 'undefined') {
  if (!localStorage.getItem('list-books')) {
    localStorage.setItem('list-books', JSON.stringify(BooksData))
  }
}

export default function Home() {
  return (
    <ThemeProvider>
      <ListBooksProvider>
        <LayoutBookstore>
          <Bookstore />
        </LayoutBookstore>
      </ListBooksProvider>
    </ThemeProvider>
  )
}
