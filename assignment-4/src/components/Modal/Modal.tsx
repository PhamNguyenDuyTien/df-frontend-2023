import React, { MouseEvent, useContext, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Styles from './Modal.module.css'
import { Books } from '../../types/books.type'
import { ListBooksContext, ThemeContext } from '../../Context'

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setAddBooks: React.Dispatch<React.SetStateAction<Books>>
  addBooks: Books
}

function accessibleOnClick(
  handler: (newValue: MouseEvent<HTMLDivElement>) => void,
) {
  return {
    role: 'button',
    onClick: handler,
  }
}

const Modal = (props: ModalProps) => {
  const { setOpenModal, setAddBooks, addBooks } = props
  const listBookscontext = useContext(ListBooksContext)
  const themecontext = useContext(ThemeContext)
  const ModalRef = useRef<HTMLDivElement>(null)

  const handleClickCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
      setOpenModal(false)
    }
  }

  const handleAddBooks = () => {
    if (addBooks.nameBooks === '' || addBooks.author === '') {
      const warnings = document.querySelectorAll('.warning')
      warnings.forEach((warning) => {
        warning.textContent = 'This field is required'
      })
    } else {
      const newBooks = addBooks
      listBookscontext.setListBooks([...listBookscontext.listBooks, newBooks])
      setAddBooks({
        id: uuidv4(),
        nameBooks: '',
        author: '',
        topic: 'Book 1',
      })
      localStorage.setItem(
        'list-books',
        JSON.stringify([...listBookscontext.listBooks, newBooks]),
      )
      setOpenModal(false)
    }
  }

  return (
    <div
      {...accessibleOnClick(handleClickCloseModal)}
      className="fixed z-10 inset-0 bg-overlay w-full cursor-default"
    >
      <div
        className={
          `${themecontext.theme === 'dark' ? 'bg-black' : 'bg-white'}` +
          ' my-[15%] mx-auto p-5 lgl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] rounded-[10px] border border-white'
        }
        ref={ModalRef}
      >
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl">
            <h2 className={themecontext.styles}>Add book</h2>
          </div>
          <button
            type="button"
            className={Styles['close']}
            onClick={() => setOpenModal(false)}
          >
            &times;
          </button>
        </div>
        <div>
          <div className="py-[10px] max-w-none ">
            <label htmlFor="name-book" className={themecontext.styles}>
              Name
              <input
                type="text"
                id="name-book"
                className={
                  `${'mt-[3px]'}` + `${' '}` + `${themecontext.styles}`
                }
                name="name-book"
                placeholder="Enter name book"
                value={addBooks.nameBooks}
                onChange={(e) =>
                  setAddBooks({
                    ...addBooks,
                    nameBooks: e.target.value,
                  })
                }
                required
              />
            </label>
            <span className="text-main" />
          </div>
          <div className="py-[10px] max-w-none">
            <label htmlFor="author" className={themecontext.styles}>
              Author
              <input
                type="text"
                id="author"
                className={
                  `${'mt-[3px]'}` + `${' '}` + `${themecontext.styles}`
                }
                name="author"
                placeholder="Enter name author"
                value={addBooks.author}
                onChange={(e) =>
                  setAddBooks({
                    ...addBooks,
                    author: e.target.value,
                  })
                }
                required
              />
            </label>
            <span className="text-main" />
          </div>
          <div className="py-[10px] max-w-none">
            <label htmlFor="topic" className={themecontext.styles}>
              Topic
              <select
                required
                name="topic"
                id="topic"
                className={
                  `${'mt-[3px]'}` + `${' '}` + `${themecontext.styles}`
                }
                value={addBooks.topic}
                onChange={(e) =>
                  setAddBooks({
                    ...addBooks,
                    topic: e.target.value,
                  })
                }
              >
                <option value="Book 1" className={themecontext.bgStyles}>
                  Book 1
                </option>
                <option value="Book 2" className={themecontext.bgStyles}>
                  Book 2
                </option>
                <option value="Book 3" className={themecontext.bgStyles}>
                  Book 3
                </option>
              </select>
            </label>
          </div>
          <div className="text-right">
            <button
              type="button"
              className="bg-main text-white p-2 rounded-md"
              onClick={handleAddBooks}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
