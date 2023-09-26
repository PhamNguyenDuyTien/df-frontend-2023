import './App.css'
import { BooksData } from './Books'
import Bookstore from './components/Bookstore/Bookstore'
import Layout from './components/Layout/Layout'
import { ThemeProvider } from './Context/ThemeContext'

function App() {
  localStorage.setItem("list-books", JSON.stringify(BooksData))
  return (
    <ThemeProvider>
      <Layout>
        <Bookstore />
      </Layout>
    </ThemeProvider>
  )
}

export default App
