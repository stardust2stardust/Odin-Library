let myLibrary = [];

const addBookBtn = document.querySelector('.add-book-btn')

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
    const submit = document.querySelector('input[type="submit"]')
    addBookBtn.classList.add('show-hide')
    form.classList.remove('show-hide')
    submit.addEventListener('click', submitForm);

    const ratingInput = document.querySelector('#rating')
    const ratingOutput = document.querySelector('.rating-output')
    ratingOutput.innerText = ratingInput.value
    ratingInput.addEventListener('input', () => {
        ratingOutput.innerText = ratingInput.value
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
        addBookBtn.classList.remove('show-hide');
        form.classList.add('show-hide');
    }
}


function addBookToLibrary(title, author, pages) {
    let hasRead = document.querySelector('input[name="read"]').value;
    let rating = document.querySelector('#rating').value;

    const newBook = new Book(title, author, pages, hasRead, rating);
    myLibrary.push(newBook);
    createNewCard(newBook);
}



// function loopOverBooks(listOfBooks) {
//     listOfBooks = myLibrary
//     myLibrary.forEach(element => {
//         console.log(element);
//         createNewCard(element);
//     });
// }


function createNewCard(newBook) {
    let card = document.createElement('div');
    let h2 = document.createElement('h2');
    let pAuthor = document.createElement('p');
    let pPages = document.createElement('p');
    let pRead = document.createElement('p');
    let pRating = document.createElement('p');
    h2.innerText = newBook.title;
    pAuthor.innerText = newBook.author;
    pPages.innerText = `${newBook.pages} pages`;
    if (newBook.hasRead === true) {
        pRead.innerText = 'Read it';
        pRating.innerText = `${newBook.rating}/10`;
    } else {
        pRead.innerText = 'Not read yet';
        pRating.innerText = `n/a`;
    }
    const main = document.querySelector('main')

    main.appendChild(card);
    card.appendChild(h2);
    card.appendChild(pAuthor);
    card.append(pPages);
    card.append(pRead);
    card.append(pRating);
    card.classList.add('card');
}



const book01 = new Book("Wizard's First Rule", "Terry Goodkind", 836, true, 10);
const book02 = new Book("Stone of Tears", "Terry Goodkind", 979, true, 8.5)
myLibrary.push(book01)
myLibrary.push(book02)

addBookBtn.addEventListener('click', showForm)




