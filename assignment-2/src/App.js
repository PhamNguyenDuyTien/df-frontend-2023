import { BooksData } from "./Books";
import { ThemeProvider } from "./Context/ThemeContext";
import Bookstore from "./components/Bookstore/Bookstore";
import Layout from "./components/Layout/Layout";

function App() {
    localStorage.setItem("list-books", JSON.stringify(BooksData))
    return (
        <ThemeProvider>
            <Layout>
                <Bookstore />
            </Layout>
        </ThemeProvider>
    );
}

export default App;
