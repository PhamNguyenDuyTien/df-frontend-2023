import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineInbox } from 'react-icons/ai'
import Styles from './Bookstore.module.css'
import { Books } from '../../types/books.type'
import Modal from '../Modal/Modal'
import Pagination from '../Pagination/Pagination'
import { ListBooks } from './ListBooks'
import { ListBooksContext, ThemeContext } from '../../Context'

const ObjectBooksType: Books = {
  id: uuidv4(),
  nameBooks: '',
  author: '',
  topic: 'Book 1',
}

const Bookstore = () => {
  const themecontext = useContext(ThemeContext)
  const listBookscontext = useContext(ListBooksContext)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [searchBooks, setSearchBooks] = useState<string>('')
  const [addBooks, setAddBooks] = useState<Books>(ObjectBooksType)

  // Pagination custom
  const [currentPage, setCurrentPage] = useState<number>(1)
  // Số phần tử hiển thị trên 1 trang
  const booksPerPage = 5
  const lastBook = currentPage * booksPerPage // cuốn sách cuối cùng
  const firstBook = lastBook - booksPerPage // cuốn sách đầu tiên

  // Search books
  const newLists = listBookscontext.listBooks.filter((list) =>
    list.nameBooks.toLowerCase().includes(searchBooks.toLowerCase()),
  )

  const currentBooks = newLists.slice(firstBook, lastBook) // những cuốn sách được hiển thị trên UI

  const handleChangeSearchBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchBooks(e.target.value)
    if (e.target.value) {
      setCurrentPage(1)
    }
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-end">
          <div className="w-full max-w-[200px]">
            <input
              type="search"
              placeholder="Search books"
              id="search-book"
              className={`${themecontext.styles}`}
              value={searchBooks}
              onChange={(e) => handleChangeSearchBooks(e)}
            />
          </div>
          <div className="ml-[10px]">
            <button
              type="button"
              title="add-book"
              className="bg-main text-white p-2 rounded-md border"
              onClick={() => setOpenModal(true)}
            >
              Add book
            </button>
          </div>
        </div>
        <div>
          <table
            id="table"
            className="lg:w-[80%] xl:w-[60%] my-5 mx-auto text-center border-collapse"
          >
            <thead>
              <tr className="bg-main text-white">
                <th className="max-w-[33%] w-full">Name</th>
                <th className="max-w-[33%] w-full">Author</th>
                <th className="max-w-[16%] w-full">Topic</th>
                <th className="max-w-[28%] w-full">Action</th>
              </tr>
            </thead>
            <tbody id="listbook">
              {currentBooks.length !== 0 ? (
                currentBooks.map((book) => (
                  <ListBooks key={book.id} book={book} />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="flex items-center justify-center h-[100px] decoration-0 pointer-events-none">
                      <AiOutlineInbox
                        className={`text-3xl mr-1 ` + `${themecontext.styles}`}
                      />
                      <span>No book was found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={Styles['bookstore-pagination']}>
          <Pagination
            newLists={newLists}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            booksPerPage={booksPerPage}
          />
        </div>
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          addBooks={addBooks}
          setAddBooks={setAddBooks}
        />
      )}
    </>
  )
}

export default Bookstore
