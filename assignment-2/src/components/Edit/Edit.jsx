import React, { useEffect, useState } from "react";

const Edit = (props) => {
    const { updateBook, setUpdateBook, styles } = props;
    return (
        <>
            <td>
                <input
                    type="text"
                    value={updateBook.nameBooks}
                    style={{ border: `${styles}` }}
                    onChange={(e) =>
                        setUpdateBook({
                            ...updateBook,
                            nameBooks: e.target.value,
                        })
                    }
                />
            </td>
            <td>
                <input
                    type="text"
                    value={updateBook.author}
                    style={{ border: `${styles}` }}
                    onChange={(e) =>
                        setUpdateBook({ ...updateBook, author: e.target.value })
                    }
                />
            </td>
            <td>
                <select
                    required
                    name="field"
                    id="topic"
                    value={updateBook.topic}
                    onChange={(e) =>
                        setUpdateBook({ ...updateBook, topic: e.target.value })
                    }
                >
                    <option value="Book 1">Book 1</option>
                    <option value="Book 2">Book 2</option>
                    <option value="Book 3">Book 3</option>
                </select>
            </td>
        </>
    );
};

export default Edit;
