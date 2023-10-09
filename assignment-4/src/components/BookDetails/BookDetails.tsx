import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { Books } from '../../types/books.type'
import ModalDelete from '../Modal/ModalDelete'
import { ThemeContext } from '../../Context'

interface BookDetailsProps {
  currentBooks: Books | undefined
}

const BookDetails = (props: BookDetailsProps) => {
  const { currentBooks } = props
  const themecontext = useContext(ThemeContext)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const handleDeleteBook = () => {
    setOpenModalDelete(true)
  }

  return (
    <>
      <div className="p-3">
        <div className="w-fit hover:opacity-70">
          <Link href="/">
            <span className="flex items-center">
              <BsChevronLeft className="mr-2" />
              Back
            </span>
          </Link>
        </div>
        <div className="p-3">
          <div>
            <h2 className={`${themecontext.styles}` + ` text-xl font-semibold`}>
              {currentBooks?.nameBooks}
            </h2>
          </div>
          <div className="mt-3">
            <p>
              Author: <span>{currentBooks?.author}</span>
            </p>
            <p>
              Topic: <span>{currentBooks?.topic}</span>
            </p>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleDeleteBook}
            className="bg-main text-white p-2 rounded-md hover:opacity-70"
          >
            Delete
          </button>
        </div>
      </div>
      {openModalDelete && (
        <ModalDelete
          book={currentBooks}
          setOpenModalDelete={setOpenModalDelete}
        />
      )}
    </>
  )
}

export default BookDetails
