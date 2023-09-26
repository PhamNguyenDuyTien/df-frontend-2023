import React, { useContext, useRef } from 'react'
import './Modal.scss'
import { ThemeContext } from '../../Context/ThemeContext'
import { Books, ListBooksType } from '../../types/books.type'
import { accessibleOnClick } from '../../types/accessibleOnclick'

interface ModalProps {
  book: Books
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>
  setListBooks: React.Dispatch<React.SetStateAction<ListBooksType>>
  listBooks: ListBooksType
}

const ModalDelete = (props: ModalProps) => {
  const { setOpenModalDelete, book, setListBooks, listBooks } = props
  const ModalRef = useRef<HTMLDivElement>(null)
  const context = useContext(ThemeContext)
  const handleClickCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
      setOpenModalDelete(false)
    }
    console.log(e.target)
  }

  const handleDeleteBooks = () => {
    const newLists = listBooks.filter((list) => list.id !== book.id)
    setListBooks([...newLists])
    localStorage.setItem('list-books', JSON.stringify(newLists))
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
            <h2>Delete book</h2>
          </div>
          <button
            type="button"
            className="modal-container-header-close"
            onClick={() => setOpenModalDelete(false)}
          >
            &times;
          </button>
        </div>
        <div className="modal-container-main">
          <div className="modal-container-main-content">
            <p>
              Do you want to delete{' '}
              <span
                style={{
                  fontWeight: 600,
                  color: '#d3455a',
                }}
              >
                {book.nameBooks}
              </span>
              ?
            </p>
          </div>
          <div className="modal-container-main-btn">
            <button className="btn" onClick={handleDeleteBooks}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
