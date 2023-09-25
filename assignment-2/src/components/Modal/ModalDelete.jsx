import React, { useContext, useRef } from "react";
import "./Modal.scss";
import { ThemeContext } from "../../Context/ThemeContext";

const ModalDelete = (props) => {
    const { setOpenModalDelete, book, setListBooks, listBooks } = props;
    const ModalRef = useRef();
    const context = useContext(ThemeContext);
    const handleClickCloseModal = (e) => {
        if (ModalRef.current && !ModalRef.current.contains(e.target)) {
            setOpenModalDelete(false);
        }
    };
    const handleDeleteBooks = () => {
        const newLists = listBooks.filter((list) => list.id !== book.id);
        setListBooks([...newLists]);
        localStorage.setItem("list-books", JSON.stringify(newLists));
    };
    return (
        <div className="modal" onClick={handleClickCloseModal}>
            <div
                className={
                    "modal-container" +
                    `${context.theme === "dark" ? " dark" : " light"}`
                }
                ref={ModalRef}
            >
                <div className="modal-container-header">
                    <div className="modal-container-header-title">
                        <h2>Delete book</h2>
                    </div>
                    <div
                        className="modal-container-header-close"
                        onClick={() => setOpenModalDelete(false)}
                    >
                        &times;
                    </div>
                </div>
                <div className="modal-container-main">
                    <div className="modal-container-main-content">
                        <p>
                            Do you want to delete{" "}
                            <span
                                style={{
                                    fontWeight: 600,
                                    color: "#d3455a",
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
    );
};

export default ModalDelete;
