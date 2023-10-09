import React, { useContext, useRef } from 'react'
import Styles from './Modal.module.css'
import { Books } from '../../types/books.type'
import { accessibleOnClick } from '../../types/accessibleOnclick'
import { usePathname, useRouter } from 'next/navigation'
import { ListBooksContext, ThemeContext } from '../../Context'

interface ModalProps {
  book?: Books
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalDelete = (props: ModalProps) => {
  const { setOpenModalDelete, book } = props
  const listBookscontext = useContext(ListBooksContext)
  const ModalRef = useRef<HTMLDivElement>(null)
  const context = useContext(ThemeContext)
  const pathname = usePathname()
  const router = useRouter()

  const handleClickCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
      setOpenModalDelete(false)
    }
  }

  const handleDeleteBooks = () => {
    const newLists = listBookscontext.listBooks.filter(
      (list) => list.id !== book?.id,
    )
    if (newLists !== undefined) {
      listBookscontext.setListBooks([...newLists])
      if (pathname.length > 1) {
        router.push('/')
      }
    }
    localStorage.setItem('list-books', JSON.stringify(newLists))
  }
  return (
    <div
      {...accessibleOnClick(handleClickCloseModal)}
      className="fixed z-10 inset-0 w-full bg-overlay cursor-default"
    >
      <div
        className={
          'my-[15%] mx-auto p-5 lgl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] rounded-[10px] border border-white ' +
          `${context.theme === 'dark' ? 'bg-black' : 'bg-white'}`
        }
        ref={ModalRef}
      >
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl">
            <h2 className={context.styles}>Delete book</h2>
          </div>
          <button
            type="button"
            className={Styles['close']}
            onClick={() => setOpenModalDelete(false)}
          >
            &times;
          </button>
        </div>
        <div className="p-1">
          <div className="mb-2">
            <p className={`${context.styles}`}>
              Do you want to delete{' '}
              <span
                style={{
                  fontWeight: 600,
                  color: '#d3455a',
                }}
              >
                {book?.nameBooks}
              </span>
              ?
            </p>
          </div>
          <div className="text-right">
            <button
              type="button"
              className="bg-main text-white p-2 rounded-md"
              onClick={handleDeleteBooks}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
