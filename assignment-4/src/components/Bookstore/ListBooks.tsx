import { useContext, useState } from 'react'
import Link from 'next/link'
import { Books } from '../../types/books.type'
import Edit from '../Edit/Edit'
import ModalDelete from '../Modal/ModalDelete'
import { ListBooksContext } from '../../Context'

interface ListBooksProps {
  book: Books
}

export const ListBooks = (props: ListBooksProps) => {
  const { book } = props
  const listBookscontext = useContext(ListBooksContext)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [styles, setStyles] = useState<boolean>(false)
  const [updateBook, setUpdateBook] = useState<Books>({
    id: book.id,
    nameBooks: book.nameBooks,
    author: book.author,
    topic: book.topic,
  })
  const handleDeleteBook = () => {
    setOpenModalDelete(true)
  }

  const handleEditBook = () => {
    setEdit(true)
  }

  const handleUpdateBook = () => {
    if (updateBook.nameBooks === '' || updateBook.author === '') {
      setStyles(true)
    } else {
      setStyles(false)
      const newLists = [...listBookscontext.listBooks]
      setEdit(false)
      for (let i = 0; i < newLists.length; i++) {
        if (newLists[i].id === updateBook.id) {
          newLists[i] = updateBook
        }
      }
      listBookscontext.setListBooks([...newLists])
      localStorage.setItem('list-books', JSON.stringify([...newLists]))
    }
  }

  return (
    <tr>
      {!edit ? (
        <>
          <td className="max-w-[33%] w-full">
            <span>{book.nameBooks}</span>
          </td>
          <td className="max-w-[33%] w-full">
            <span>{book.author}</span>
          </td>
          <td className="max-w-[16%] w-full">
            <span>{book.topic}</span>
          </td>
        </>
      ) : (
        <Edit
          styles={styles}
          updateBook={updateBook}
          setUpdateBook={setUpdateBook}
        />
      )}
      <td className="max-w-[28%] w-full">
        <div className="flex items-center justify-evenly md:flex-row flex-col">
          <div className="px-2">
            {!edit ? (
              <button
                type="button"
                onClick={handleEditBook}
                className="text-blue font-semibold mx-[2px]"
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUpdateBook}
                className="text-blue font-semibold mx-[2px]"
              >
                Save
              </button>
            )}
          </div>
          <div className="px-2">
            <button
              type="button"
              onClick={handleDeleteBook}
              className="text-main font-semibold mx-[2px]"
            >
              Delete
            </button>
          </div>
          <div className="px-2">
            <Link
              href={`/${book.id}`}
              type="button"
              className="text-green font-semibold mx-[2px]"
            >
              View
            </Link>
          </div>
        </div>
        {openModalDelete && (
          <ModalDelete book={book} setOpenModalDelete={setOpenModalDelete} />
        )}
      </td>
    </tr>
  )
}
