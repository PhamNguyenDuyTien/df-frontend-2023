import React, { useContext, useRef } from "react";
import "./Modal.scss";
import { ThemeContext } from "../../Context/ThemeContext";

const Modal = (props) => {
    const { setOpenModal, setAddBooks, addBooks, setListBooks, listBooks } =
        props;
    const ModalRef = useRef();
    const context = useContext(ThemeContext);

    const handleClickCloseModal = (e) => {
        if (ModalRef.current && !ModalRef.current.contains(e.target)) {
            setOpenModal(false);
        }
    };

    const handleAddBooks = () => {
        if (addBooks.nameBooks === "" || addBooks.author === "") {
            const warnings = document.querySelectorAll(".warning");
            warnings.forEach((warning) => {
                warning.textContent = "This field is required";
            });
        } else {
            const newBooks = addBooks;
            setListBooks([...listBooks, newBooks]);
            setAddBooks({
                id: Math.round(Math.random() * 1000000),
                nameBooks: "",
                author: "",
                topic: "Book 1",
            });
            localStorage.setItem(
                "list-books",
                JSON.stringify([...listBooks, newBooks])
            );
            setOpenModal(false);
        }
    };

    return (
        <div className="modal" onClick={(e) => handleClickCloseModal(e)}>
            <div
                className={
                    "modal-container" +
                    `${context.theme === "dark" ? " dark" : " light"}`
                }
                ref={ModalRef}
            >
                <div className="modal-container-header">
                    <div className="modal-container-header-title">
                        <h2>Add book</h2>
                    </div>
                    <div
                        className="modal-container-header-close"
                        onClick={() => setOpenModal(false)}
                    >
                        &times;
                    </div>
                </div>
                <div className="modal-container-main">
                    <div className="modal-container-main-input input-field">
                        <label htmlFor="name-book">Name</label>
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
                        <span className="warning"></span>
                    </div>
                    <div className="modal-container-main-input input-field">
                        <label htmlFor="author">Author</label>
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
                        <span className="warning"></span>
                    </div>
                    <div className="modal-container-main-input input-field">
                        <label htmlFor="topic">Topic</label>
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
                    </div>
                    <div className="modal-container-main-btn">
                        <button className="btn" onClick={handleAddBooks}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
