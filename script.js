let myLibrary = [];
const bookForm = document.getElementById("add-book-form");
const bookFormContainer = document.querySelector("div.form-container");
const addBookButton = document.querySelector("button.add-book");
const libContainer = document.querySelector("div.book-list");

class Book {
    constructor(title, author, pgno, genre, isRead) {
        this.title = title;
        this.author = author;
        this.pgno = pgno;
        this.genre = genre;
        this.isRead = isRead;
    }
}

// the form is hidden by default using a class
// this function toggles the form's visibility
function showForm() {
    bookFormContainer.classList.toggle("hidden");
}

// remove a book entry from the library array
function removeBookFromLibrary(event) {
	let index = Number(event.target.dataset.number);
	myLibrary = myLibrary.filter((_, i) => i != index);
	showLibrary(); // re-render the library list
}

// toggle a book's read status between "read" and "not read"
function toggleRead(event) {
	let index = Number(event.target.dataset.number);
	myLibrary[index].isRead = !(myLibrary[index].isRead);
	showLibrary(); // re-render the library list
}

// render the books in the library array in the markup
function showLibrary() {

	// remove all the divs in the library container
	// this is so the function can render everything afresh
	while (libContainer.firstChild) {
		libContainer.removeChild(libContainer.lastChild);
	}

	// loops through the library array and adds each book to the markup
    myLibrary.forEach((book, index) => {
        let container = document.createElement("div");
        container.classList.add("book-item");
		container.dataset.number = index;

        let bookTitle = document.createElement("div");
        bookTitle.textContent = `${book.title}`
        container.appendChild(bookTitle);

        let bookAuthor = document.createElement("div");
        bookAuthor.textContent = `${book.author}`
        container.appendChild(bookAuthor);

        let bookPageNo = document.createElement("div");
        bookPageNo.textContent = `${book.pgno}`
        container.appendChild(bookPageNo);

        let bookGenre = document.createElement("div");
        bookGenre.textContent = `${book.genre}`
        container.appendChild(bookGenre);

        let bookIsRead = document.createElement("div");
        bookIsRead.textContent = ((book.isRead === true) ? "read" : "not read");
        container.appendChild(bookIsRead);

        let readButton = document.createElement("button");
        readButton.classList.add("toggle-read");
        readButton.textContent = "Toggle Read";
		readButton.dataset.number = index;
		readButton.addEventListener("click", toggleRead);
        container.appendChild(readButton);

		let removeBookButton = document.createElement("button");
		removeBookButton.classList.add("remove-book-button");
		removeBookButton.textContent = "Remove Book";
		removeBookButton.dataset.number = index;
		removeBookButton.addEventListener("click", removeBookFromLibrary);
		container.appendChild(removeBookButton);

        libContainer.appendChild(container);
    })
}

function addBookToLibrary(event) {
    event.preventDefault();

    let bookTitle = document.getElementById("book-title");
    let bookAuthor = document.getElementById("book-author");
    let bookPageNo = document.getElementById("book-pgno");
    let bookGenre = document.getElementById("book-genre");
    let bookIsRead = document.querySelector("input[name='book-is-read']:checked");
    let book;

    if (!(bookTitle && bookAuthor && bookPageNo && bookGenre && bookIsRead)) {
        throw new Error("your mom left you bro");
    } else {
        book = new Book(
            bookTitle.value,
            bookAuthor.value,
            Number(bookPageNo.value),
            bookGenre.value,
            (bookIsRead.value === "yes" ? true : false)
        )
        myLibrary.push(book);
        showLibrary();
		console.log(myLibrary);
    }
}

addBookButton.addEventListener("click", showForm);
bookForm.addEventListener("submit", addBookToLibrary);
