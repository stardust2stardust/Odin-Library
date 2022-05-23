let myLibrary = [];

const addBookBtn = document.querySelector('.add-book-btn')
const form = document.querySelector('form')
const submit = document.querySelector('.submit-btn>button')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesinput = document.querySelector('#pages')
const hasReadInput = document.querySelectorAll('input[name="read"]')
const main = document.querySelector('main')


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

function submitForm(e) {
    e.preventDefault();
    addBookToLibrary();
}

function addBookToLibrary() {
    let title = titleInput.value
    let author = authorInput.value
    let pages = pagesinput.value
    let hasRead = hasReadInput.value

    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook)

    loopOverBooks();
}

function showForm() {
    form.classList.remove('show-hide')
}

function loopOverBooks(listOfBooks) {
    listOfBooks = myLibrary
    myLibrary.forEach(element => {
        console.log(element);
        createNewCard();
    });
}
function createNewCard() {
    let card = document.createElement('div');

    let h2 = document.createElement('h2')
    let pAuthor = document.createElement('p')
    let pPages = document.createElement('p')
    let pRead = document.createElement('p')
    h2.innerText = "New Book Title"
    pAuthor.innerText = "author goes here"
    pPages.innerText = "pages goes here"
    pRead.innerText = "yes or no"
    main.appendChild(card)
    card.appendChild(h2)
    card.appendChild(pAuthor)
    card.append(pPages)
    card.append(pRead)

    card.classList.add('card');
}

// addBookToLibrary();

const book01 = new Book("Wizard's First Rule", "Terry Goodkind", 836, true);
const book02 = new Book("Stone of Tears", "Terry Goodkind", 979, true)
myLibrary.push(book01)
myLibrary.push(book02)

addBookBtn.addEventListener('click', showForm)
submit.addEventListener('click', submitForm)



