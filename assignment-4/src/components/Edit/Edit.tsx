import React, { useContext } from 'react'
import { Books } from '../../types/books.type'
import { ThemeContext } from '../../Context'

interface EditProps {
  updateBook: Books
  setUpdateBook: React.Dispatch<React.SetStateAction<Books>>
  styles: boolean
}

const Edit = (props: EditProps) => {
  const { updateBook, setUpdateBook, styles } = props
  const themecontext = useContext(ThemeContext)
  return (
    <>
      <td>
        <input
          placeholder="Enter name book"
          type="text"
          value={updateBook.nameBooks}
          className={
            `${styles === true ? 'border border-main' : ''}` +
            `${themecontext.styles}`
          }
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
          className={
            `${styles === true ? 'border border-main' : ''}` +
            `${themecontext.styles}`
          }
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
          className={`${themecontext.styles}`}
          value={updateBook.topic}
          onChange={(e) =>
            setUpdateBook({ ...updateBook, topic: e.target.value })
          }
        >
          <option value="Book 1" className={themecontext.bgStyles}>Book 1</option>
          <option value="Book 2" className={themecontext.bgStyles}>Book 2</option>
          <option value="Book 3" className={themecontext.bgStyles}>Book 3</option>
        </select>
      </td>
    </>
  )
}

export default Edit
