const addBtn = document.querySelector("#addbtn");
const addBookModal = document.querySelector("#addBookModal");
const overlay = document.querySelector("#overlay");
const addBookForm = document.querySelector("#addBookForm");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

// modal area
function modal() {
    if (addBookModal.classList.contains("active")) {
        addBookModal.classList.remove("active");
        overlay.classList.remove("active");
    } else {
        addBookModal.classList.add("active");
        overlay.classList.add("active");
    }
}
addBtn.addEventListener("click", modal);
overlay.addEventListener("click", modal);

// library area
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
    library.addBook(
        new Book(title.value, author.value, pages.value, read.checked)
    );
    modal();
}
addBookForm.onsubmit = addBookToLibrary;
