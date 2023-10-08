import React, { Dispatch, SetStateAction } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Styles from '../Bookstore/Bookstore.module.css'
import { Books } from '../../types/books.type'

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

interface PaginationProps {
  newLists: Books[]
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  booksPerPage: number
}

const Pagination = (props: PaginationProps) => {
  const { newLists, currentPage, setCurrentPage, booksPerPage } = props

  const numPages = Math.ceil(newLists.length / booksPerPage) // số trang
  let totalPages = numPages

  const handlePageChange = (pageNumber: number) => {
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
  const pagesToShow: number = 5 // Số lượng trang được hiển thị cùng một lúc
  // Khoảng cách giữa trang hiện tại và startPages, khoảng cách này sẽ không quá xa.
  const distanceStartToCurrent = Math.floor(pagesToShow / 2)

  let startPage: number = Math.max(1, currentPage - distanceStartToCurrent)
  const endPage: number = Math.min(totalPages, startPage + pagesToShow - 1)

  if (endPage - startPage < pagesToShow - 1) {
    startPage = Math.max(1, endPage - pagesToShow + 1)
  }
  // Mảng này chứa số lượng số trang
  //   const numbers: number[] = [...Array(endPage - startPage + 1).keys()].slice(0)
  const numbers: number[] = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => index + startPage,
  )

  return (
    newLists.length > booksPerPage && (
      <ul className={Styles['pagination']}>
        {currentPage > 1 && (
          <li>
            <button type="button" title="button-prev" onClick={handlePrevPage}>
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
            className={
              currentPage === startPage + index ? `${Styles['active']}` : ''
            }
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
            <button type="button" onClick={() => handlePageChange(totalPages)}>
              <span>{totalPages}</span>
            </button>
          </li>
        )}
        {currentPage < totalPages && (
          <li>
            <button type="button" title="button-next" onClick={handleNextPage}>
              <span>
                <BsChevronRight className={Styles['icon-pagination']} />
              </span>
            </button>
          </li>
        )}
      </ul>
    )
  )
}

export default Pagination
