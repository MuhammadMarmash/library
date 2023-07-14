const addBtn = document.querySelector("#addbtn");
const addBookModal = document.querySelector("#addBookModal");
const overlay = document.querySelector("#overlay");
const addBookForm = document.querySelector("#addBookForm");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const content = document.querySelector("#content");

// ui area
function modal() {
    if (addBookModal.classList.contains("active")) {
        addBookModal.classList.remove("active");
        overlay.classList.remove("active");
        title.value = "";
        author.value = "";
        pages.value = "";
        read.checked = false;
    } else {
        addBookModal.classList.add("active");
        overlay.classList.add("active");
    }
}
addBtn.addEventListener("click", modal);
overlay.addEventListener("click", modal);
function readBtnColor(isRead, readBtn) {
    if (isRead) {
        readBtn.textContent = "Read";
        readBtn.classList.remove("btn-light-red");
        readBtn.classList.add("btn-light-green");
    } else {
        readBtn.textContent = "Not read";
        readBtn.classList.remove("btn-light-green");
        readBtn.classList.add("btn-light-red");
    }
}
function readBookBtn(book) {
    book.read = book.read ? false : true;
}
function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");

    const titleLapel = document.createElement("p");
    titleLapel.textContent = `"${book.title}"`;
    card.appendChild(titleLapel);

    const authorLapel = document.createElement("p");
    authorLapel.textContent = book.author;
    card.appendChild(authorLapel);

    const pagesLapel = document.createElement("p");
    pagesLapel.textContent = `${book.pages} Pages`;
    card.appendChild(pagesLapel);

    const readBtn = document.createElement("button");
    readBtn.classList.add("btn");
    readBtnColor(book.read, readBtn);
    readBtn.addEventListener("click", function (e) {
        readBookBtn(book);
        readBtnColor(book.read, readBtn);
    });

    card.appendChild(readBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("btn");
    card.appendChild(removeBtn);
    removeBtn.addEventListener("click", function (e) {
        removeBookUi(book.title, card);
    });
    return card;
}
function initBooksUi() {
    library.books.forEach((book) => {
        content.appendChild(createBookCard(book));
    });
}

function addBookUi(book) {
    content.appendChild(createBookCard(book));
}

function removeBookUi(title, card) {
    content.removeChild(card);
    library.removeBook(title);
}
// logic area
class Book {
    constructor(
        title = "Unknown",
        author = "Unknown",
        pages = "0",
        read = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}
class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBook(title) {
        return this.books.find((book) => book.title === title);
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }
}
const library = new Library();

function addBookToLibrary(e) {
    e.preventDefault();
    const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.checked
    );

    library.addBook(newBook);
    addBookUi(newBook);
    modal();
}
addBookForm.onsubmit = addBookToLibrary;
initBooksUi();
