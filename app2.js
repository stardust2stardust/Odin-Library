

// DOM constants
const newBookBtn = document.querySelector('.new-book-btn')
const updateBook = document.querySelector('#book-list');

// Constructor // 
function Book(title, author, pages, hasRead, ratingOutput, date) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
    this.bookID = 'id' + (new Date()).getTime();
    this.rating = ratingOutput
    this.date = date
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

    const bookList = document.querySelector('table');
    const legend = document.querySelector('.legend')
    bookList.classList.add('hide')
    legend.classList.add('hide')

    const addBookBtn = document.querySelector('.form-submit-btn');
    addBookBtn.addEventListener('click', submitForm);

    const cancelFormBtn = document.querySelector('.form-cancel-btn');
    cancelFormBtn.addEventListener('click', cancelForm)
}

// submit Form
function submitForm(e) {
    e.preventDefault();

    const bookList = document.querySelector('table');
    const legend = document.querySelector('.legend')
    bookList.classList.remove('hide');
    legend.classList.remove('hide')

    // remove previous error msg if present
    const formDiv = document.querySelector('form>div')
    if (formDiv.classList.contains('fail')) {
        formDiv.remove();
    }

    const title = document.querySelector('#title')
    const author = document.querySelector('#author')
    const pages = document.querySelector('#pages')
    const hasRead = document.querySelector('input[name="readStatus"]:checked').value;
    const rating = document.querySelector('#rating');
    const date = document.querySelector('#date')

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
        let dateOutput;
        if (hasRead === "--") {
            ratingOutput = 'n/a';
            dateOutput = 'tbd'
        } else {
            let star = '\u2605';
            let starOutput = '';
            ratingNumValue = parseInt(rating.value)
            for (let i = 0; i < ratingNumValue; i++) {
                starOutput += star
            }
            ratingOutput = starOutput;
            dateOutput = date.value
        }


        // if (date.value === '') {
        //     dateOutput = 'tbd'
        // } else {
        //     dateOutput = date.value;
        // }

        const newBook = new Book(title.value, author.value, pages.value, hasRead, ratingOutput, dateOutput);
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
    document.querySelector('#rating').value = '';
    document.querySelector('#date').value = '';
}


function cancelForm() {
    const form = document.querySelector('form');
    form.classList.add('hide');
    newBookBtn.classList.remove('hide');

    const bookList = document.querySelector('table');
    const legend = document.querySelector('.legend')
    bookList.classList.remove('hide');
    legend.classList.remove('hide')

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
    td3.classList.add('pages-col')
    const td4 = document.createElement('td');
    td4.innerText = newBook.hasRead;
    td4.classList.add('read-status')
    const td4a = document.createElement('td');
    td4a.innerText = newBook.date;
    td4a.classList.add('date-col');
    const td4b = document.createElement('td');
    td4b.innerText = newBook.rating
    td4b.classList.add('rating-col');
    const td5 = document.createElement('td');
    td5.innerText = newBook.bookID;
    td5.classList.add('hide');
    const td6 = document.createElement('td');
    td6.innerHTML = '<a href="#" class="btn delete">X</a>';
    td6.classList.add('delete-column')

    list.append(newRow);
    newRow.append(td1, td2, td3, td4, td4a, td4b, td5, td6);


}


// delete  book from UI
function delFromUI(e) {
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


function changeStatusUI(e) {
    if (e.target.innerText === '--') {
        e.target.innerHTML = '&#x2714';
    } else {
        e.target.innerText = '--'
    }
}


function changeStatusLibrary(bookID) {
    const myLibrary = getLibrary();
    myLibrary.forEach((book) => {
        if (book.bookID === bookID) {
            if (book.hasRead === '--') {
                let checkMark = '\u2714'
                book.hasRead = checkMark;
            } else {
                book.hasRead = '--';
            }
        }
    });
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}


function changeRatingUI(ratingToUpdate, bookID) {
    let newRatingInput = document.createElement('input');
    newRatingInput.classList.add('rating-input-box');
    newRatingInput.setAttribute('type', 'number')
    newRatingInput.setAttribute('min', '1')
    newRatingInput.setAttribute('max', '5')
    let newRatingBtn = document.createElement('button')
    newRatingBtn.innerText = "Ok"
    ratingToUpdate.innerText = "";
    ratingToUpdate.append(newRatingInput, newRatingBtn)
    newRatingBtn.addEventListener('click', () => {
        let ratingValue = newRatingInput.value;
        ratingToUpdate.innerText = ``
        let numOfStars = parseInt(ratingValue);
        let star = '\u2605';
        let starOutput = '';
        for (let i = 0; i < numOfStars; i++) {
            starOutput += star
        }
        ratingToUpdate.innerText = starOutput;

        changeRatingLibrary(bookID, starOutput)
    });
}

function changeRatingLibrary(bookID, updatedRating) {
    const myLibrary = getLibrary();
    myLibrary.forEach(book => {
        if (book.bookID === bookID) {
            book.rating = updatedRating;
        }
    })
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function changeDateUI(dateToUpdate, bookID) {
    let newDateInput = document.createElement('input')
    newDateInput.classList.add('date-input-box')
    newDateInput.setAttribute('type', 'date');
    let newDateBtn = document.createElement('button');
    let dateCancelBtn = document.createElement('button');
    newDateBtn.innerText = "Ok"
    dateCancelBtn.innerText = "X"
    let origDateText = dateToUpdate.innerText
    dateToUpdate.innerText = '';
    dateToUpdate.append(newDateInput)
    dateToUpdate.append(newDateBtn, dateCancelBtn)
    newDateBtn.addEventListener('click', () => {
        let dateValue = newDateInput.value;
        dateToUpdate.innerText = dateValue;
        changeDateLibrary(bookID, dateValue)
    });

    dateCancelBtn.addEventListener('click', () => {
        dateToUpdate.innerText = origDateText
    })
}

function changeDateLibrary(bookID, dateValue) {
    const myLibrary = getLibrary();
    myLibrary.forEach(book => {
        if (book.bookID === bookID) {
            book.date = dateValue;
        }
    })
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}


// Event: display books in UI
document.addEventListener('DOMContentLoaded', showLibrary);

// Event: click on 'new book' button
newBookBtn.addEventListener('click', showForm)

// Event: Edit status, date, rating or delete book in UI (and my library)
updateBook.addEventListener('click', (e) => {
    // console.log('Clicked Item: ', e.target)
    // delete book
    if (e.target.classList.contains('delete')) {
        // console.log('del button clicked');
        delFromUI(e.target);
        delFromLibrary(e.target.parentElement.previousElementSibling.innerText)
    }

    // changes read status
    if (e.target.classList.contains('read-status')) {
        // console.log('status cell clicked');
        changeStatusUI(e);
        changeStatusLibrary(e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText)
    }

    // update Rating
    if (e.target.classList.contains('rating-col')) {
        // console.log('rating cell clicked');
        changeRatingUI(e.target, e.target.nextElementSibling.innerText)
    }

    // update completion date
    if (e.target.classList.contains('date-col')) {
        // console.log('date cell clicked')
        changeDateUI(e.target, e.target.nextElementSibling.nextElementSibling.innerText)
    }
});




