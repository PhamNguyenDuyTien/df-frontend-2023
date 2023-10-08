'use client'
import React, { useEffect, useState } from 'react'
import LayoutBookstore from '../../components/LayoutBookstore/LayoutBookstore'
import { Books } from '../../types/books.type'
import BookDetails from '../../components/BookDetails/BookDetails'
import { ListBooksProvider, ThemeProvider } from '../../Context'
import NotFound from './not-found'

interface Params {
  params: {
    detailBooks: string;
  }
}
const Page = ({ params }: Params) => {
  const [currentBooks, setCurrentBooks] = useState<Books>()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const listBooksStorage: string | null = localStorage.getItem('list-books')
      if (listBooksStorage !== null) {
        const listBooks = JSON.parse(listBooksStorage)
        const itemBook: Books = listBooks.find(
          (book: Books) => book.id.toString() === params.detailBooks,
        )
        setCurrentBooks(itemBook)
      }
    }
  }, [params.detailBooks])

  if(currentBooks === undefined) {
    return <NotFound />
  }
  return (
    <ThemeProvider>
      <ListBooksProvider>
        <LayoutBookstore>
          <BookDetails currentBooks={currentBooks} />
        </LayoutBookstore>
      </ListBooksProvider>
    </ThemeProvider>
  )
}

export default Page
