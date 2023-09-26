import React, { useContext, useRef } from 'react'
import './Modal.scss'
import { v4 as uuidv4 } from 'uuid'
import { ThemeContext } from '../../Context/ThemeContext'
import { Books, ListBooksType } from '../../types/books.type'
import { accessibleOnClick } from '../../types/accessibleOnclick'

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setAddBooks: React.Dispatch<React.SetStateAction<Books>>
  addBooks: Books
  setListBooks: React.Dispatch<React.SetStateAction<ListBooksType>>
  listBooks: ListBooksType
}

const Modal = (props: ModalProps) => {
  const { setOpenModal, setAddBooks, addBooks, setListBooks, listBooks } = props
  const ModalRef = useRef<HTMLDivElement>(null)
  const context = useContext(ThemeContext)

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
      setListBooks([...listBooks, newBooks])
      setAddBooks({
        id: uuidv4(),
        nameBooks: '',
        author: '',
        topic: 'Book 1',
      })
      localStorage.setItem(
        'list-books',
        JSON.stringify([...listBooks, newBooks]),
      )
      setOpenModal(false)
    }
  }

  return (
    <div {...accessibleOnClick(handleClickCloseModal)}>
      <div
        className={
          'modal-container' 
          + `${context.theme === 'dark' ? ' dark' : ' light'}`
        }
        ref={ModalRef}
      >
        <div className="modal-container-header">
          <div className="modal-container-header-title">
            <h2>Add book</h2>
          </div>
          <button
            type="button"
            className="modal-container-header-close"
            onClick={() => setOpenModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="modal-container-main">
          <div className="modal-container-main-input input-field">
            <label htmlFor="name-book">
              Name
              <input
                type="text"
                id="name-book"
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
            <span className="warning" />
          </div>
          <div className="modal-container-main-input input-field">
            <label htmlFor="author">
              Author
              <input
                type="text"
                id="author"
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
            <span className="warning" />
          </div>
          <div className="modal-container-main-input input-field">
            <label htmlFor="topic">
              Topic
              <select
                required
                name="topic"
                id="topic"
                value={addBooks.topic}
                onChange={(e) =>
                  setAddBooks({
                    ...addBooks,
                    topic: e.target.value,
                  })
                }
              >
                <option value="Book 1">Book 1</option>
                <option value="Book 2">Book 2</option>
                <option value="Book 3">Book 3</option>
              </select>
            </label>
          </div>
          <div className="modal-container-main-btn">
            <button type="button" className="btn" onClick={handleAddBooks}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
