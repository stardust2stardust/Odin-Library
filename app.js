myLibrary = [];

const addBookBtn = document.querySelector('.add-book-btn')
const delBookBtn = document.querySelectorAll('.del-book-btn')
const form = document.querySelector('form')
const submit = document.querySelector('.submit-btn')
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const main = document.querySelector('main')


// Constructor //
function Book(title, author, pages, hasRead, rating) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
    this.rating = rating
    this.bookID = 'id' + (new Date()).getTime();
}


function showForm() {
    addBookBtn.classList.add('faded')
    main.classList.add('faded')
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
        addBookBtn.classList.remove('faded');
        main.classList.remove('faded')
    })
}


function submitForm(e) {
    e.preventDefault();

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;

    // check that text inputs were filled out
    if (title.length < 1 || author.length < 1 || pages.length < 1) {
        alert("Please make sure all fields are filled out")
    } else {
        addBookToLibrary(title, author, pages);
        const form = document.querySelector('form')
        addBookBtn.classList.remove('faded');
        main.classList.remove('faded');
        form.classList.add('hide');
    }
}


function addBookToLibrary(title, author, pages) {
    let hasRead = document.querySelector('input[name="read"]:checked').value;
    let rating = document.querySelector('#rating').value;

    const newBook = new Book(title, author, pages, hasRead, rating);
    myLibrary.push(newBook);
    createNewCard(newBook);
    clearForm();
}


function createNewCard(newBook) {
    const main = document.querySelector('main')
    const card = document.createElement('div');
    const bookID = newBook.bookID

    let readOrNot;
    let userRating;
    if (newBook.hasRead === 'true') {
        readOrNot = 'Read it';
        userRating = `${newBook.rating}/10`;
    } else {
        readOrNot = 'Not read yet';
        userRating = ``;
    }

    card.innerHTML = `
    <div class="book-title">
        <h2>${newBook.title}</h2>
    </div>
    <div class="book-info">
        <p class="info-p">${newBook.author}</p>
        <p class="info-p">${newBook.pages} pages</p>
        <p class="info-p read-or-not">${readOrNot}</p>
        <p class="info-p">${userRating}</p>
    </div>
    <div>
        <p class="edit">update</p>
    </div>
    <div class="book-remove">
       
        <img src="/images/close-thick.png" id="${bookID}" alt="remove from library" class="del-book-btn">
    </div>
    `
    main.appendChild(card).classList.add('card');

}



function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    hasRead.value = '';
    rating.value = 1;
}

function removeBookFromUI(el) {
    if (el.classList.contains('del-book-btn')) {
        const bookToRemove = el.parentElement.parentElement
        bookToRemove.remove();
    }
}



function removeBookFromLibrary(idInLibrary) {
    myLibrary.forEach(book => {
        if (idInLibrary === book.bookID) {
            const bookIndex = myLibrary.indexOf(book)
            myLibrary.splice(bookIndex, 1)
        }
    });
}

function checkClickedElement(e) {
    if (e.target.classList.contains('del-book-btn')) {
        const idInLibrary = e.target.id
        removeBookFromUI(e.target);
        removeBookFromLibrary(idInLibrary);
    }
    if (e.target.classList.contains('edit')) {
        console.log('need to changes status');
    }
}

addBookBtn.addEventListener('click', showForm)

main.addEventListener('click', checkClickedElement)

// const book01 = new Book("Wizard's First Rule", "Terry Goodkind", 836, true, 10);
// const book02 = new Book("Stone of Tears", "Terry Goodkind", 979, true, 8.5)
// const book03 = new Book("The Name of the Wind", "Patrick Rothfuss", 662, true, 9.0);
// const book04 = new Book("the Wise Man's Fear", "Patrick Rothfuss", 994, false, 0);
// myLibrary.push(book01)
// myLibrary.push(book02)
// myLibrary.push(book03)
// myLibrary.push(book04)
// createNewCard(book01)
// createNewCard(book02)
// createNewCard(book03)
// createNewCard(book04)


