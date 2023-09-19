// Your JS code goes here
const modal = document.getElementById("modal-add-book");
const table = document.getElementById("listbook");
const closeDeleteBook = document.getElementById("modal-delete-book");

var lists = JSON.parse(localStorage.getItem("list-books")) || [];
localStorage.setItem("list-books", JSON.stringify(lists || []));

// Render new row after adding new book, deleting book or searching book
const renderNewRow = (nameBook, author, topic, index) => {
    if (nameBook !== "" || author !== "") {
        // Create a new row
        var newRow = document.createElement("tr");

        newRow.setAttribute("id", `row-${index}`);

        // Create columns for each row
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");

        var col1 = document.createElement("span");
        var col2 = document.createElement("span");
        var col3 = document.createElement("span");
        var col4 = document.createElement("span");

        // Set content
        col1.textContent = `${nameBook}`;
        col2.textContent = `${author}`;
        col3.textContent = `${topic}`;
        col4.innerHTML = `
            <div class="flex-center justify-evenly">
                <div id="btn-${index}">
                    <span style="color: #4100fff0" onclick="editBook('${nameBook}', '${author}', '${topic}', ${index})">Edit</span>
                </div>
                <div class="delete-book">
                    <span onclick="openModal('modal-delete-book', '${nameBook}', ${index})">Delete</span>
                </div>
            </div>
        `;

        // Add columns for each row
        td1.appendChild(col1);
        td2.appendChild(col2);
        td3.appendChild(col3);
        td4.appendChild(col4);

        newRow.appendChild(td1);
        newRow.appendChild(td2);
        newRow.appendChild(td3);
        newRow.appendChild(td4);

        table.appendChild(newRow);
    }
};

// Render data from localStorage
const render = () => {
    if (lists.length !== 0) {
        table.innerHTML = "";
        lists.forEach((list) => {
            renderNewRow(list.nameBook, list.author, list.topic, list.id);
        });
    } else {
        table.innerHTML = `
            <tr>
                <td colspan="4" rowspan="1" class="empty-row">
                    <div class="flex-center justify-center">
                        <i class="fa-solid fa-box"></i>
                        <span>No book was found</span>
                    </div>
                </td>
            </tr>    
        `;
    }
};

// Open modal
const openModal = (props, nameBook, index) => {
    const dom = document.getElementById(props) || document.querySelector(props);
    dom.style.display = "block";
    if (props === "modal-delete-book") {
        const bookname = document.getElementById("bookname");
        bookname.textContent = nameBook;
        const btnDeleteModal = document.getElementById("btn-delete-modal");
        btnDeleteModal.innerHTML = `
            <div class="btn-field" id="delete-book">
                <button class="btn" onclick="deleteBook(${index})">Delete</button>
            </div>
            <div class="btn-field" id="cancel-delete">
                <button class="btn" onclick="cancelDelete()">Cancel</button>
            </div>
        `;
    }
};

// Close modal
const closeModal = (props) => {
    const dom = document.getElementById(props) || document.querySelector(props);
    const domCloses = document.querySelectorAll(".close");
    domCloses.forEach((domClose) => {
        if (this.event.target == domClose) {
            dom.style.display = "none";
        }
    });
    if (this.event.target == dom) {
        dom.style.display = "none";
    }
};

// Add book
const addBook = () => {
    const nameBook = document.getElementById("name-book").value.trim();
    const author = document.getElementById("author").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const getNameBook = document.getElementById("get-name-book");
    const getAuthor = document.getElementById("get-author");

    let id = Math.round(Math.random() * 1000000);

    if (nameBook.trim() !== "" && author.trim() !== "") {
        lists.push({ nameBook, author, topic, id });
        localStorage.setItem("list-books", JSON.stringify(lists));

        modal.style.display = "none";

        document.getElementById("name-book").value = "";
        document.getElementById("author").value = "";
        document.getElementById("topic").value = "Book 1";
    }

    if (nameBook === "") {
        getNameBook.textContent = "Please enter the name of book!";
    } else {
        getNameBook.textContent = "";
    }
    if (author === "") {
        getAuthor.textContent = "Please enter the name of author!";
    } else {
        getAuthor.textContent = "";
    }

    render();
};

// Delete book
const deleteBook = (index) => {
    lists = lists.filter((list) => list.id !== index);
    localStorage.setItem("list-books", JSON.stringify(lists));
    closeDeleteBook.style.display = "none";
    render();
};

const cancelDelete = () => {
    closeDeleteBook.style.display = "none";
};

// Edit book
const editBook = (nameBook, author, topic, index) => {
    const thisRow = document.getElementById(`row-${index}`);
    const editBtn = document.getElementById(`btn-${index}`);

    // When click Edit, change text to input and select tag
    let newInputNameBook = document.createElement("input");
    newInputNameBook.type = "text";
    newInputNameBook.value = nameBook;
    newInputNameBook.required = true;
    newInputNameBook.setAttribute("class", "input-change");

    let newInputAuthor = document.createElement("input");
    newInputAuthor.type = "text";
    newInputAuthor.value = author;
    newInputAuthor.required = true;
    newInputAuthor.setAttribute("class", "input-change");

    let newSelectBook = document.createElement("select");
    newSelectBook.setAttribute("class", "input-change");
    for (let i = 0; i < 3; i++) {
        const option = document.createElement("option");
        option.textContent = `Book ${i + 1}`;
        option.value = `Book ${i + 1}`;

        if (option.value === topic) {
            option.defaultSelected = true;
        }
        newSelectBook.appendChild(option);
    }

    // Replace the texts to inputs
    thisRow.children[0].children[0].parentNode.replaceChild(
        newInputNameBook,
        thisRow.children[0].children[0]
    );
    thisRow.children[1].children[0].parentNode.replaceChild(
        newInputAuthor,
        thisRow.children[1].children[0]
    );
    thisRow.children[2].children[0].parentNode.replaceChild(
        newSelectBook,
        thisRow.children[2].children[0]
    );

    // Change the content button Edit -> Save
    const saveText = document.createElement("span");
    saveText.textContent = "Save";
    saveText.addEventListener("click", () =>
        saveBook(
            newInputNameBook.value,
            newInputAuthor.value,
            newSelectBook.value,
            index
        )
    );
    saveText.style.color = "#4100fff0";

    editBtn.replaceChild(saveText, editBtn.children[0]);
};

// Save book
const saveBook = (nameBook, author, topic, index) => {
    const thisRow = document.getElementById(`row-${index}`);
    const saveBtn = document.getElementById(`btn-${index}`);

    // If nameBook === "" && author === "" => warning
    if (nameBook !== "" && author !== "") {
        let newArr = lists.find((list) => list.id === index);
        newArr = {
            nameBook,
            author,
            topic,
            id: index,
        };

        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id === index) {
                lists[i] = newArr;
            }
        }

        localStorage.setItem("list-books", JSON.stringify(lists));

        const editText = document.createElement("span");
        editText.textContent = "Edit";
        editText.addEventListener("click", () =>
            editBook(nameBook, author, topic, index)
        );
        editText.style.color = "#4100fff0";

        let newsNameBook = document.createElement("span");
        newsNameBook.textContent = nameBook;

        let newAuthor = document.createElement("span");
        newAuthor.textContent = author;

        let newTopicBook = document.createElement("span");
        newTopicBook.textContent = topic;

        thisRow.children[0].children[0].parentNode.replaceChild(
            newsNameBook,
            thisRow.children[0].children[0]
        );
        thisRow.children[1].children[0].parentNode.replaceChild(
            newAuthor,
            thisRow.children[1].children[0]
        );
        thisRow.children[2].children[0].parentNode.replaceChild(
            newTopicBook,
            thisRow.children[2].children[0]
        );

        saveBtn.replaceChild(editText, saveBtn.children[0]);
    } else {
        if (nameBook === "") {
            thisRow.children[0].children[0].style.border = "1px solid red";
        }
        if (author === "") {
            thisRow.children[1].children[0].style.border = "1px solid red";
        }
    }
};

// Search book
const searchBooks = () => {
    let newLists = [];
    let searchValue = document
        .getElementById("search-book")
        .value.toLowerCase();
    if (searchValue.startsWith(" ")) {
        searchValue = searchValue.slice(1);
    } else {
        newLists = lists.filter((list) =>
            list.nameBook.toLowerCase().includes(searchValue)
        );

        if (newLists.length !== 0) {
            table.innerHTML = "";
            newLists.forEach((list) => {
                renderNewRow(list.nameBook, list.author, list.topic, list.id);
            });
        } else {
            table.innerHTML = `
                <tr>
                    <td colspan="4" rowspan="1" class="empty-row">
                    <div class="flex-center justify-center">
                    <i class="fa-solid fa-box"></i>
                    <span>No book was found</span>
                    </div>
                    </td>
                </tr>
            `;
        }
    }
};

render();
