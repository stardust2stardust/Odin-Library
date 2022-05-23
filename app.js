let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
    this.info = function () {
        const bookInfo = `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`;
        return bookInfo;
    }
}

function addBookToLibrary() {
    let title = prompt("Title: ");
    let author = prompt("Author: ")
    let pages = prompt("Pages: ")
    let hasRead = prompt("Read it? ")

    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook)
}

// addBookToLibrary();

const book01 = new Book("Wizard's First Rule", "Terry Goodkind", 836, true);
const book02 = new Book("Stone of Tears", "Terry Goodkind", 979, true)
myLibrary.push(book01)
myLibrary.push(book02)





