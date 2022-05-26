myLibrary = [];


const addBookBtn = document.querySelector('.add-book-btn')
const delBookBtn = document.querySelectorAll('.del-book-btn')

// Constructor //
function Book(title, author, pages, hasRead, rating) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
    this.rating = rating
}


function showForm() {
    const form = document.querySelector('form')
    const submit = document.querySelector('.submit-btn')

    addBookBtn.classList.add('hide')
    form.classList.remove('hide')
    submit.addEventListener('click', submitForm);

    const ratingInput = document.querySelector('#rating')
    const ratingOutput = document.querySelector('.rating-output')
    ratingOutput.innerText = ratingInput.value
    ratingInput.addEventListener('input', () => {
        ratingOutput.innerText = ratingInput.value
    });
    const cancel = document.querySelector('.cancel-btn')
    cancel.addEventListener('click', () => {
        form.classList.add('hide')
        addBookBtn.classList.remove('hide')
    })
}


function submitForm(e) {
    e.preventDefault();
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const pagesInput = document.querySelector('#pages');
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;

    // check that text inputs were filled out
    if (title.length < 1 || author.length < 1 || pages.length < 1) {
        alert("Please make sure all fields are filled out")
    } else {
        addBookToLibrary(title, author, pages);
        const form = document.querySelector('form')
        addBookBtn.classList.remove('hide');
        form.classList.add('hide');
    }
}


function addBookToLibrary(title, author, pages) {
    let hasRead = document.querySelector('input[name=read]:checked').value;
    let rating = document.querySelector('#rating').value;

    const newBook = new Book(title, author, pages, hasRead, rating);
    myLibrary.push(newBook);
    createNewCard(newBook);
}


function createNewCard(newBook) {
    const main = document.querySelector('main')
    const card = document.createElement('div');

    let readOrNot;
    let userRating;
    if (newBook.hasRead === 'true') {
        readOrNot = 'Read it';
        userRating = `${newBook.rating}/10`;
    } else {
        readOrNot = 'Not read yet';
        userRating = `n/a`;
    }

    card.innerHTML = `
    <div class="book-title">
        <h2>${newBook.title}</h2>
    </div>
    <div class="book-info">
        <p class="info-p">${newBook.author}</p>
        <p class="info-p">${newBook.pages} pages</p>
        <p class="info-p">${readOrNot}</p>
        <p class="info-p">${userRating}</p>
    </div>
    <div class="book-remove">
        <img src="/images/close-thick.png" alt="remove from library" class="del-book-btn">
    </div>
    `

    main.appendChild(card).classList.add('card')

    assignNumsToCards();
}

function removeBook(e) {
    console.log('This will remove book from the library');
    console.log(e.node)
}


const book01 = new Book("Wizard's First Rule", "Terry Goodkind", 836, true, 10);
const book02 = new Book("Stone of Tears", "Terry Goodkind", 979, true, 8.5)
myLibrary.push(book01)
myLibrary.push(book02)

addBookBtn.addEventListener('click', showForm)

function assignNumsToCards() {
    const cards = document.querySelectorAll('.card');
    let i = 0;
    cards.forEach(card => {
        let cardIndex = i;
        i++;
        console.log(`card #: ${cardIndex}`)

    })
}





