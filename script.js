class Book {
    static #entries = [];
    constructor(title, author, length, genre, status) {
        this.title = title;
        this.author = author;
        this.length = length;
        this.genre = genre;
        this.status = status;
    }

    static getEntries() {
        return this.#entries;
    }

    static makeEntry(...args) {
        this.#entries.push(new Book(...args));
    }

    static deleteEntry(n) {
        if (n - 1 > -1) this.#entries.splice(n - 1, 1)
    }
}

const makeEntryFormContainer = document.querySelector('.form-container.create');
const editEntryFormContainer = document.querySelector('.form-container.update');
const libList = document.querySelector('main');
const makeEntryButton = document.querySelector('.make-entry button');
const cancelEntryMenuButton = document.querySelector('.create-form button');
const cancelEditMenuButton = document.querySelector('.update-form button');
const addToLibrary = document.querySelector('.create .submit');

function showMenu(event) {
    if (event.target.parentNode.classList.contains('make-entry')) {
        makeEntryFormContainer.style.display = 'flex';
    } else {
        editEntryFormContainer.style.display = 'flex';
    }
}

function hideMenu(event) {
    event.target.parentNode.style.display = 'none';
}

function makeEntryDOM() {
    const title = document.querySelector('.create .title').value;
    const author = document.querySelector('.create .author').value;
    const length = document.querySelector('.create .length').value;
    const genre = document.querySelector('.create .genre').value;
    const status = document.querySelector('input[name=status]:checked').value;
    Book.makeEntry(title, author, length, genre, status);
    makeEntryFormContainer.style.display = 'none';
    displayEntries();
}

function displayEntries() {
    Book.getEntries().forEach((book, index) => {
        let container = document.createElement("div");
        container.classList.add("row", "entry");
        container.dataset.number = index;

        let title = document.createElement("div");
        title.textContent = `${book.title}`
        container.appendChild(title);

        let author = document.createElement("div");
        author.textContent = `${book.author}`
        container.appendChild(author);

        let length = document.createElement("div");
        length.textContent = `${book.length}`
        container.appendChild(length);

        let genre = document.createElement("div");
        genre.textContent = `${book.genre}`
        container.appendChild(genre);

        let status = document.createElement("div");
        status.textContent = `${book.status}`;
        container.appendChild(status);

        let editEntryButton = document.createElement("button");
        editEntryButton.classList.add("edit-entry");
        editEntryButton.textContent = "edit entry";
        editEntryButton.dataset.number = index;
        // editEntryButton.addEventListener("click", n);
        container.appendChild(editEntryButton);

        let deleteEntryButton = document.createElement("button");
        deleteEntryButton.classList.add("remove-book-button");
        deleteEntryButton.textContent = "Remove Book";
        deleteEntryButton.dataset.number = index;
        // deleteEntryButton.addEventListener("click", deleteEntry);
        container.appendChild(deleteEntryButton);

        libList.appendChild(container);
    })
}

makeEntryButton.addEventListener('click', showMenu);
cancelEntryMenuButton.addEventListener('click', hideMenu);
cancelEditMenuButton.addEventListener('click', hideMenu);
addToLibrary.addEventListener('click', makeEntryDOM);
