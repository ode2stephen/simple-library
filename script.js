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
        if (n-1 > -1) this.#entries.splice(n-1, 1)
    }
}

Book.makeEntry('lord of the rings', 'tolkien', 3000, 'fantasy', 'reading');
Book.makeEntry('star wars', 'lucas', 3000, 'sci-fi', 'not read');
console.log(Book.getEntries());
Book.deleteEntry(1);
console.log(Book.getEntries());
