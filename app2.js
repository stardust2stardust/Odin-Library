

// DOM constants
const newBookBtn = document.querySelector('.new-book-btn')
const updateBook = document.querySelector('#book-list');

// Constructor // 
function Book(title, author, pages, hasRead, ratingOutput) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
    this.bookID = 'id' + (new Date()).getTime();
    this.rating = ratingOutput
}


// show library in UI
function showLibrary() {
    const storedLibrary = getLibrary();
    const books = storedLibrary;
    books.forEach(book => {
        addBookToUI(book)
    });
}


// show Form 
function showForm() {
    clearForm();
    title.classList.remove('input-error', 'input-valid');
    author.classList.remove('input-error', 'input-valid');
    pages.classList.remove('input-error', 'input-valid');

    const form = document.querySelector('form');
    form.classList.remove('hide');
    newBookBtn.classList.add('hide');

    const addBookBtn = document.querySelector('.form-submit-btn');
    addBookBtn.addEventListener('click', submitForm);

    const cancelFormBtn = document.querySelector('.form-cancel-btn');
    cancelFormBtn.addEventListener('click', cancelForm)
}

// submit Form
function submitForm(e) {
    e.preventDefault();


    // remove previous error msg if present
    const formDiv = document.querySelector('form>div')
    if (formDiv.classList.contains('fail')) {
        formDiv.remove();
    }

    const title = document.querySelector('#title')
    const author = document.querySelector('#author')
    const pages = document.querySelector('#pages')
    const hasRead = document.querySelector('input[name="readStatus"]:checked').value;
    const rating = document.querySelector('#rating')

    if (title.value === '' || author.value === '' || pages.value === '') {
        showErrorMsg();

        if (title.value.length < 1) {
            title.classList.add('input-error');
        } else {
            title.classList.add('input-valid');
        }

        if (author.value.length < 1) {
            author.classList.add('input-error');
        } else {
            author.classList.add('input-valid');
        }

        if (pages.value.length < 1) {
            pages.classList.add('input-error');
        } else {
            pages.classList.add('input-valid');
        }
    } else {
        const form = document.querySelector('form');
        form.classList.add('hide')
        newBookBtn.classList.remove('hide');

        let ratingOutput;
        if (hasRead === "--") {
            ratingOutput = 'n/a'
        } else {
            ratingOutput = `${rating.value}/10`
        }

        const newBook = new Book(title.value, author.value, pages.value, hasRead, ratingOutput);
        addBookToLibrary(newBook);
        addBookToUI(newBook);
        clearForm();


    }
}

function showErrorMsg() {
    const div = document.createElement('div');
    div.className = `fail`;
    div.append(document.createTextNode("Please fill out all fields"))
    const form = document.querySelector('#book-form')
    const titleDiv = document.querySelector('.title-div');
    form.insertBefore(div, titleDiv);
}

// clear Form 
function clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read-yes').checked = false;
    document.querySelector('#read-no').checked = true;
}


function cancelForm() {
    const form = document.querySelector('form');
    form.classList.add('hide');
    newBookBtn.classList.remove('hide');

    title.classList.remove('input-error', 'input-valid');
    author.classList.remove('input-error', 'input-valid');
    pages.classList.remove('input-error', 'input-valid');
    const formDiv = document.querySelector('form>div')
    if (formDiv.classList.contains('fail')) {
        formDiv.remove();
    }
}

// get my library from local storage
function getLibrary() {
    let myLibrary;
    if (localStorage.getItem('myLibrary') === null) {
        myLibrary = [];
    } else {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    console.log('my library: ', myLibrary)
    return myLibrary
}

// add book to my library
function addBookToLibrary(newBook) {
    const myLibrary = getLibrary();
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}


// create list item to add to book list on UI
function addBookToUI(newBook) {

    const list = document.querySelector('#book-list');
    const newRow = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = newBook.title;
    const td2 = document.createElement('td');
    td2.innerText = newBook.author;
    const td3 = document.createElement('td');
    td3.innerText = newBook.pages;
    const td4 = document.createElement('td');
    td4.innerText = newBook.hasRead;
    td4.classList.add('read-status')
    const td4b = document.createElement('td');
    td4b.innerText = newBook.rating;
    const td5 = document.createElement('td');
    td5.innerText = newBook.bookID;
    td5.classList.add('hide');
    const td6 = document.createElement('td');
    td6.innerHTML = '<a href="#" class="btn delete">X</a>';


    list.append(newRow);
    newRow.append(td1);
    newRow.append(td2);
    newRow.append(td3);
    newRow.append(td4);
    newRow.append(td4b)
    newRow.append(td5);
    newRow.append(td6);
}


// delete  book from UI and Library
function delFromUI(e) {

    // remove book from UI
    if (e.classList.contains('delete')) {
        e.parentElement.parentElement.remove();
    }
}

// remove book from my library
function delFromLibrary(bookID) {
    const myLibrary = getLibrary();
    myLibrary.forEach((book, index) => {
        if (book.bookID === bookID) {
            myLibrary.splice(index, 1);
        }
    });
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}


function changeStatus(e) {
    console.log(e.target.innerText)

    if (e.target.innerText === '--') {
        e.target.innerHTML = '&#x2714';
        rateBook(e);

    } else {
        e.target.innerText = '--'
    }
}

function rateBook(e) {
    console.log('rateBook called');
    console.log(e.target);
    const ratingBox = e.target.nextElementSibling.nextElementSibling;
    const ratingPopup = document.querySelector('.rating-box')
    ratingPopup.classList.remove('hide')
}


// Event: display books in UI
document.addEventListener('DOMContentLoaded', showLibrary);

// Event: click on 'new book' button
newBookBtn.addEventListener('click', showForm)

// Event: Remove book from UI (and my library)
updateBook.addEventListener('click', (e) => {
    console.log(e.target)
    // delete book
    if (e.target.classList.contains('delete')) {
        console.log('del button clicked');
        delFromUI(e.target);
        delFromLibrary(e.target.parentElement.previousElementSibling.innerText)
    }

    // changes read status
    if (e.target.classList.contains('read-status')) {
        console.log('status cell clicked')
        changeStatus(e)
    }



});




