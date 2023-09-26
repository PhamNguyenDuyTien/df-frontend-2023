import React from 'react'
import './Edit.scss'
import { Books } from '../../types/books.type'

interface EditProps {
  updateBook: Books
  setUpdateBook: React.Dispatch<React.SetStateAction<Books>>
  styles: boolean
}

const Edit = (props: EditProps) => {
  const { updateBook, setUpdateBook, styles } = props
  return (
    <>
      <td>
        <input
          placeholder="Enter name book"
          type="text"
          value={updateBook.nameBooks}
          className={`${styles === true ? 'edit-input' : ''}`}
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
          placeholder="Enter author"
          type="text"
          value={updateBook.author}
          className={`${styles === true ? 'edit-input' : ''}`}
          onChange={(e) =>
            setUpdateBook({ ...updateBook, author: e.target.value })
          }
        />
      </td>
      <td>
        <select
          title="field"
          required
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
  )
}

export default Edit
