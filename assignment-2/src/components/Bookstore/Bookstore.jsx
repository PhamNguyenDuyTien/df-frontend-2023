import React, { useState } from "react";
import "./Bookstore.scss";
import Modal from "../Modal/Modal";
import Edit from "../Edit/Edit";
import ModalDelete from "../Modal/ModalDelete";
import { AiOutlineInbox } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Bookstore = () => {
    let listBooksStorage = JSON.parse(localStorage.getItem("list-books")) || [];
    const [openModal, setOpenModal] = useState(false);
    const [listBooks, setListBooks] = useState(listBooksStorage);
    const [searchBooks, setSearchBooks] = useState("");
    const [addBooks, setAddBooks] = useState({
        id: Math.round(Math.random() * 1000000),
        nameBooks: "",
        author: "",
        topic: "Book 1",
    });

    // Pagination custom
    const [currentPage, setCurrentPage] = useState(1);
    // Tổng số trang
    let totalPages = 0;
    // Số phần tử hiển thị trên 1 trang
    const booksPerPage = 5;
    const lastBook = currentPage * booksPerPage; // cuốn sách cuối cùng
    const firstBook = lastBook - booksPerPage; // cuốn sách đầu tiên

    // Search books
    const newLists = listBooks.filter((list) =>
        list.nameBooks.toLowerCase().includes(searchBooks.toLowerCase())
    );

    const currentBooks = newLists.slice(firstBook, lastBook); // những cuốn sách được hiển thị trên UI
    const numPages = Math.ceil(newLists.length / booksPerPage); // số trang
    totalPages = numPages;

    const handleChangeSearchBooks = (e) => {
        e.preventDefault();
        setSearchBooks(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
        const pagesToShow = 5; // Số lượng trang được hiển thị cùng một lúc
        // Khoảng cách giữa trang hiện tại và startPages, khoảng cách này sẽ không quá xa.
        const distanceStartToCurrent = Math.floor(pagesToShow / 2);

        let startPage = Math.max(1, currentPage - distanceStartToCurrent);
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        if (endPage - startPage < pagesToShow - 1) {
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }
        // Mảng này chứa số lượng số trang
        const numbers = [...Array(endPage - startPage + 1).keys()].slice(0);
        return (
            <>
                {newLists.length > booksPerPage && (
                    <ul className="pagination">
                        {currentPage > 1 && (
                            <li onClick={handlePrevPage}>
                                <BsChevronLeft className="icon-pagination" />
                            </li>
                        )}
                        {startPage > 1 && (
                            <li onClick={() => handlePageChange(1)}>1</li>
                        )}
                        {startPage > 2 && <li>...</li>}
                        {numbers.map((_, index) => (
                            <li
                                key={startPage + index}
                                onClick={() =>
                                    handlePageChange(startPage + index)
                                }
                                className={
                                    currentPage === startPage + index
                                        ? "active"
                                        : ""
                                }
                            >
                                {startPage + index}
                            </li>
                        ))}
                        {endPage < totalPages - 1 && <li>...</li>}
                        {endPage < totalPages && (
                            <li onClick={() => handlePageChange(totalPages)}>
                                {totalPages}
                            </li>
                        )}
                        {currentPage < totalPages && (
                            <li onClick={handleNextPage}>
                                <BsChevronRight className="icon-pagination" />
                            </li>
                        )}
                    </ul>
                )}
            </>
        );
    };

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
    );
};

export default Bookstore;

export const ListBooks = (props) => {
    const { book, listBooks, setListBooks, addBooks } = props;
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [edit, setEdit] = useState(false);
    const [styles, setStyles] = useState("");
    const [updateBook, setUpdateBook] = useState({
        id: book.id,
        nameBooks: book.nameBooks,
        author: book.author,
        topic: book.topic,
    });
    const handleDeleteBook = () => {
        setOpenModalDelete(true);
    };

    const handleEditBook = () => {
        setEdit(true);
    };

    const handleUpdateBook = () => {
        if (updateBook.nameBooks === "" || updateBook.author === "") {
            setStyles("1px solid red");
        } else {
            setStyles("");
            let newLists = [...listBooks];
            setEdit(false);
            for (let i = 0; i < newLists.length; i++) {
                if (newLists[i].id === updateBook.id) {
                    newLists[i] = updateBook;
                }
            }
            setListBooks([...newLists]);
            localStorage.setItem("list-books", JSON.stringify([...newLists]));
        }
    };

    return (
        <tr>
            {!edit ? (
                <>
                    <td>{book.nameBooks}</td>
                    <td>{book.author}</td>
                    <td>{book.topic}</td>
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
                            <span onClick={handleEditBook}>Edit</span>
                        ) : (
                            <span onClick={handleUpdateBook}>Save</span>
                        )}
                    </div>
                    <div className="delete">
                        <span onClick={handleDeleteBook}>Delete</span>
                    </div>
                    {openModalDelete && (
                        <ModalDelete
                            book={book}
                            setOpenModalDelete={setOpenModalDelete}
                            listBooks={listBooks}
                            setListBooks={setListBooks}
                            addBooks={addBooks}
                        />
                    )}
                </div>
            </td>
        </tr>
    );
};
