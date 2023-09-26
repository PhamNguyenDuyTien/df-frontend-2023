import React, { useState } from 'react'
import './Bookstore.scss'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { AiOutlineInbox } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import Modal from '../Modal/Modal'
import Edit from '../Edit/Edit'
import ModalDelete from '../Modal/ModalDelete'
import { Books, ListBooksType } from '../../types/books.type'

const ObjectBooksType: Books = {
  id: uuidv4(),
  nameBooks: '',
  author: '',
  topic: 'Book 1',
}

const Bookstore = () => {
  const listString: string | null = localStorage.getItem('list-books')
  let listBooksStorage: ListBooksType = []
  if (listString !== null) {
    listBooksStorage = JSON.parse(listString)
  }
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [listBooks, setListBooks] = useState<ListBooksType>(listBooksStorage)
  const [searchBooks, setSearchBooks] = useState<string>('')
  const [addBooks, setAddBooks] = useState<Books>(ObjectBooksType)

  // Pagination custom
  const [currentPage, setCurrentPage] = useState<number>(1)
  // Tổng số trang
  let totalPages = 0
  // Số phần tử hiển thị trên 1 trang
  const booksPerPage = 5
  const lastBook = currentPage * booksPerPage // cuốn sách cuối cùng
  const firstBook = lastBook - booksPerPage // cuốn sách đầu tiên

  // Search books
  const newLists = listBooks.filter((list) =>
    list.nameBooks.toLowerCase().includes(searchBooks.toLowerCase()),
  )

  const currentBooks = newLists.slice(firstBook, lastBook) // những cuốn sách được hiển thị trên UI
  const numPages = Math.ceil(newLists.length / booksPerPage) // số trang
  totalPages = numPages

  const handleChangeSearchBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchBooks(e.target.value)
    if (e.target.value) {
      setCurrentPage(1)
    }
  }

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  /**
   *
   * - Cách thức phân trang
   * 1 2 3 4 5 ... totalPages
   * 1 ... 3 4 5 6 7 ... totalPages
   * - Nếu tổng số lương trang quá nhiều phải chia ra từng phân đoạn. Với đoạn 1 là trang 1,
   * đoạn 2 là số lượng trang hiển thị cùng 1 lúc (3 4 5 6 7), đoạn 3 là trang cuối cùng.
   * - Như trên số lượng trang hiển thị: pagesToShow = 5 với startPage = 3, endPage = 7
   *
   */
  const renderPagination = () => {
    const pagesToShow: number = 5 // Số lượng trang được hiển thị cùng một lúc
    // Khoảng cách giữa trang hiện tại và startPages, khoảng cách này sẽ không quá xa.
    const distanceStartToCurrent = Math.floor(pagesToShow / 2)

    let startPage: number = Math.max(1, currentPage - distanceStartToCurrent)
    const endPage: number = Math.min(totalPages, startPage + pagesToShow - 1)

    if (endPage - startPage < pagesToShow - 1) {
      startPage = Math.max(1, endPage - pagesToShow + 1)
    }
    // Mảng này chứa số lượng số trang
    const numbers: number[] = [...Array(endPage - startPage + 1).keys()].slice(
      0,
    )
    return (
      newLists.length > booksPerPage && (
        <ul className="pagination">
          {currentPage > 1 && (
            <li>
              <button
                type="button"
                title="button-prev"
                onClick={handlePrevPage}
              >
                <span>
                  <BsChevronLeft className="icon-pagination" />
                </span>
              </button>
            </li>
          )}
          {startPage > 1 && (
            <li>
              <button type="button" onClick={() => handlePageChange(1)}>
                <span>1</span>
              </button>
            </li>
          )}
          {startPage > 2 && (
            <li>
              <span>...</span>
            </li>
          )}
          {numbers.map((_, index) => (
            <li
              key={startPage + index}
              className={currentPage === startPage + index ? 'active' : ''}
            >
              <button
                onClick={() => handlePageChange(startPage + index)}
                type="button"
              >
                <span>{startPage + index}</span>
              </button>
            </li>
          ))}
          {endPage < totalPages - 1 && (
            <li>
              <span>...</span>
            </li>
          )}
          {endPage < totalPages && (
            <li>
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
              >
                <span>{totalPages}</span>
              </button>
            </li>
          )}
          {currentPage < totalPages && (
            <li>
              <button
                type="button"
                title="button-next"
                onClick={handleNextPage}
              >
                <span>
                  <BsChevronRight className="icon-pagination" />
                </span>
              </button>
            </li>
          )}
        </ul>
      )
    )
  }

  return (
    <>
      <div className="bookstore">
        <div className="bookstore-header">
          <div className="bookstore-header-search input-field">
            <input
              type="search"
              placeholder="Search books"
              id="search-book"
              value={searchBooks}
              onChange={(e) => handleChangeSearchBooks(e)}
            />
          </div>
          <div className="bookstore-header-add">
            <button
              type="button"
              title="add-book"
              className="btn"
              onClick={() => setOpenModal(true)}
            >
              Add book
            </button>
          </div>
        </div>
        <div className="bookstore-table">
          <table id="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Topic</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="listbook">
              {currentBooks.length !== 0 ? (
                currentBooks.map((book) => (
                  <ListBooks
                    key={book.id}
                    book={book}
                    listBooks={listBooks}
                    setListBooks={setListBooks}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="empty-row">
                      <AiOutlineInbox className="icon" />
                      <span>No book was found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bookstore-pagination">{renderPagination()}</div>
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          addBooks={addBooks}
          setAddBooks={setAddBooks}
          listBooks={listBooks}
          setListBooks={setListBooks}
        />
      )}
    </>
  )
}

export default Bookstore

interface ListBooksProps {
  book: Books
  listBooks: ListBooksType
  setListBooks: React.Dispatch<React.SetStateAction<ListBooksType>>
}

export const ListBooks = (props: ListBooksProps) => {
  const { book, listBooks, setListBooks } = props
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
      const newLists = [...listBooks]
      setEdit(false)
      for (let i = 0; i < newLists.length; i++) {
        if (newLists[i].id === updateBook.id) {
          newLists[i] = updateBook
        }
      }
      setListBooks([...newLists])
      localStorage.setItem('list-books', JSON.stringify([...newLists]))
    }
  }

  return (
    <tr>
      {!edit ? (
        <>
          <td>
            <span>{book.nameBooks}</span>
          </td>
          <td>
            <span>{book.author}</span>
          </td>
          <td>
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
      <td>
        <div className="action">
          <div className="edit">
            {!edit ? (
              <button type="button" onClick={handleEditBook}>
                <span>Edit</span>
              </button>
            ) : (
              <button type="button" onClick={handleUpdateBook}>
                <span>Save</span>
              </button>
            )}
          </div>
          <div className="delete">
            <button type="button" onClick={handleDeleteBook}>
              <span>Delete</span>
            </button>
          </div>
        </div>
        {openModalDelete && (
          <ModalDelete
            book={book}
            setOpenModalDelete={setOpenModalDelete}
            listBooks={listBooks}
            setListBooks={setListBooks}
          />
        )}
      </td>
    </tr>
  )
}
