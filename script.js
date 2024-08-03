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
        if (n > -1) this.#entries.splice(n, 1)
    }

    static editEntry(index, props) {
        this.#entries[index] = {
            ...this.#entries[index],
            ...props,
        }
    }
}

const makeEntryFormContainer = document.querySelector('.form-container.create');
const editEntryFormContainer = document.querySelector('.form-container.update');
const libList = document.querySelector('main');
const makeEntryButton = document.querySelector('.make-entry button');
const cancelEntryMenuButton = document.querySelector('.create-form .cancel');
const cancelEditMenuButton = document.querySelector('.update-form .cancel');
const addToLibrary = document.querySelector('.create .submit');
const saveEdits = document.querySelector('.update .submit');

function showMenu(event) {
    if (event.target.parentNode.classList.contains('make-entry')) {
        makeEntryFormContainer.style.display = 'flex';
    } else {
        editEntryFormContainer.style.display = 'flex';
        editEntryFormContainer.dataset.number = Number(event.target.parentNode.dataset.number);
    }
}

function hideMenu(event) {
    event.target.parentNode.parentNode.style.display = 'none';
}

function makeEntryDOM() {
    let addTitle = document.querySelector('.create .title');
    let addAuthor = document.querySelector('.create .author');
    let addLength = document.querySelector('.create .length');
    let addGenre = document.querySelector('.create .genre');
    let addStatus = document.querySelector('.create input[name=status]:checked');
    Book.makeEntry(addTitle.value, addAuthor.value, addLength.value, addGenre.value, addStatus.value);
    makeEntryFormContainer.style.display = 'none';
    addTitle.value = '';
    addAuthor.value = '';
    addLength.value = '';
    addGenre.value = '';
    let statusChecks = addStatus.parentNode.parentNode.querySelectorAll('input[name=status]');
    for (let i = 0; i < statusChecks.length; i++) {
        statusChecks[i].checked = false;
    }
    displayEntries();
}

function editEntryDOM(event) {
    let editTitle = document.querySelector('.update .title');
    let editAuthor = document.querySelector('.update .author');
    let editLength = document.querySelector('.update .length');
    let editGenre = document.querySelector('.update .genre');
    let editStatus = document.querySelector('.update input[name=status]:checked');

    const index = Number(event.target.parentNode.parentNode.dataset.number);
    const props = {}
    editTitle.value ? props.title = editTitle.value : null;
    editAuthor.value ? props.author = editAuthor.value : null;
    editLength.value ? props.length = editLength.value : null;
    editGenre.value ? props.genre = editGenre.value : null;
    editStatus ? props.status = editStatus.value : null;
    Book.editEntry(index, props)
    editTitle.value = '';
    editAuthor.value = '';
    editLength.value = '';
    editGenre.value = '';
    editEntryFormContainer.style.display = 'none';
    let statusChecks = editStatus.parentNode.parentNode.querySelectorAll('input[name=status]');
    for (let i = 0; i < statusChecks.length; i++) {
        statusChecks[i].checked = false;
    }
    displayEntries();
    displayEntries();
}

function deleteEntryDOM(event) {
    Book.deleteEntry(Number(event.target.parentNode.dataset.number));
    displayEntries();
}

function displayEntries() {
    const bookRows = document.querySelectorAll('.entry');
    for (let i = 0; i < bookRows.length; i++) {
        libList.removeChild(bookRows[i]);
    }

    Book.getEntries().forEach((book, index) => {
        const container = document.createElement("div");
        container.classList.add("row", "entry");
        container.dataset.number = index;

        const title = document.createElement("div");
        title.textContent = `${book.title}`
        container.appendChild(title);

        const author = document.createElement("div");
        author.textContent = `${book.author}`
        container.appendChild(author);

        const length = document.createElement("div");
        length.textContent = `${book.length}`
        container.appendChild(length);

        const genre = document.createElement("div");
        genre.textContent = `${book.genre}`
        container.appendChild(genre);

        const status = document.createElement("div");
        status.textContent = `${book.status}`;
        container.appendChild(status);

        const editEntryButton = document.createElement("button");
        editEntryButton.classList.add("edit-entry");
        editEntryButton.textContent = "edit";
        editEntryButton.dataset.number = index;
        editEntryButton.addEventListener("click", showMenu);
        container.appendChild(editEntryButton);

        const deleteEntryButton = document.createElement("button");
        deleteEntryButton.classList.add("remove-book-button");
        deleteEntryButton.textContent = "remove";
        deleteEntryButton.dataset.number = index;
        deleteEntryButton.addEventListener("click", deleteEntryDOM);
        container.appendChild(deleteEntryButton);

        libList.appendChild(container);
    })
}

makeEntryButton.addEventListener('click', showMenu);
cancelEntryMenuButton.addEventListener('click', hideMenu);
cancelEditMenuButton.addEventListener('click', hideMenu);
addToLibrary.addEventListener('click', makeEntryDOM);
saveEdits.addEventListener('click', editEntryDOM);
