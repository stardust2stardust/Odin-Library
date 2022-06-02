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
    addBookBtn.classList.add('hide')

    main.classList.add('faded');
    main.removeEventListener('click', checkClickedElement);
    form.classList.remove('hide');
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
        addBookBtn.classList.remove('hide');
        main.classList.remove('faded');
    })
}


function submitForm(e) {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;


    // check that text inputs were filled out
    if (title.length < 1 || author.length < 1 || pages.length < 1) {
        if (title.length < 1) {
            titleInput.style.border = "1px solid red";
        } else {
            titleInput.style.border = "1px solid green";
        }

        if (author.length < 1) {
            authorInput.style.border = "1px solid red";
        } else {
            authorInput.style.border = "1px solid green";
        }

        if (pages.length < 1) {
            pagesInput.style.border = "1px solid red";
        } else {
            pagesInput.style.border = "1px solid green";
        }
    }
    else {
        addBookToLibrary(title, author, pages);
        const form = document.querySelector('form')
        addBookBtn.classList.remove('hide');
        main.classList.remove('faded');
        form.classList.add('hide');
        main.addEventListener('click', checkClickedElement);
    }
}


function addBookToLibrary(title, author, pages) {
    const hasRead = document.querySelector('input[name="read"]:checked').value;
    const rating = document.querySelector('#rating').value;

    const newBook = new Book(title, author, pages, hasRead, rating);
    myLibrary.push(newBook);
    createNewCard(newBook);
    clearForm();
}


function createNewCard(newBook) {
    const main = document.querySelector('main')
    const card = document.createElement('div');
    card.classList.add('card');
    const bookID = newBook.bookID
    card.setAttribute('id', bookID);

    let readOrNot;
    let userRating;
    if (newBook.hasRead === 'true') {
        readOrNot = 'Read it';
        userRating = `${newBook.rating}/10`;
    } else {
        readOrNot = 'Not read yet';
        userRating = ``;
    }
    // append title to card
    const titleDiv = document.createElement('div');
    const h2 = document.createElement('h2')
    h2.classList.add('book-title');
    h2.innerText = newBook.title;
    main.append(card)
    card.append(titleDiv)
    titleDiv.append(h2);

    // append book info to card
    const bookInfoDiv = document.createElement('div');
    bookInfoDiv.classList.add('book-info')
    const pAuthor = document.createElement('p')
    pAuthor.classList.add('info-p');
    const pPages = document.createElement('p')
    pPages.classList.add('info-p');
    const pReadStatus = document.createElement('p')
    pReadStatus.classList.add('info-p', 'read-or-not');
    const pRating = document.createElement('p')
    pRating.classList.add('info-p');
    

    pAuthor.innerText = newBook.author;
    pPages.innerText = newBook.pages;
    pReadStatus.innerText = readOrNot;
    pRating.innerText = userRating;

    card.append(bookInfoDiv)
    bookInfoDiv.append(pAuthor)
    bookInfoDiv.append(pPages)
    bookInfoDiv.append(pReadStatus)
    bookInfoDiv.append(pRating);


    // append update item and remove icon 
    const updateDiv = document.createElement('div');
    updateDiv.classList.add('update-div');
    const pUpdate = document.createElement('p')
    pUpdate.classList.add('edit');
    pUpdate.setAttribute('data-book-id', bookID)
    // const removeIconDiv = document.createElement('div')
    // removeIconDiv.classList.add('book-remove');
    const removeIcon = document.createElement('img')
    removeIcon.setAttribute('data-book-id', bookID)
    removeIcon.classList.add('del-book-btn')

    pUpdate.innerText = "update"
    removeIcon.src = "/images/close-thick.png"

    card.append(updateDiv)
    updateDiv.append(pUpdate)
    
    // card.append(removeIconDiv)
    // removeIconDiv.append(removeIcon);
    updateDiv.append(removeIcon)

    const update = card.querySelector('.edit')
    if (newBook.hasRead === 'true') {
        update.classList.add('hide')
    }
}


function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
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
    const thisClickedItem = e.target
    const thisClickedItemId = thisClickedItem.dataset.bookId
    if (e.target.classList.contains('del-book-btn')) {
        console.log('delete button clicked')
        const idInLibrary = e.target.dataset.bookId
        removeBookFromUI(e.target);
        removeBookFromLibrary(idInLibrary);
    }
    if (e.target.classList.contains('edit')) {
        console.log('update button clicked')
        const updateRatingBox = document.querySelector('.popup2');
        updateRatingBox.classList.remove('hide');
        const ratingInput2 = document.querySelector('.rating2');
        const ratingOutput2 = document.querySelector('.rating-output2');
        ratingOutput2.innerText = ratingInput2.value;
        ratingInput2.addEventListener('input', () => {
            ratingOutput2.innerText = ratingInput2.value;
        });
        
   
        
        const thisCard = e.target.parentElement.parentElement
        console.log(thisCard)
     

        document.querySelector('.update-rating-ok').addEventListener('click', (e) => {
            if (thisCard.id === thisClickedItemId) {
                thisBookUpdate.innerText = ratingInput2.value
            console.log(ratingInput2.value)
            thisBookUpdate.parentElement.parentElement.childNodes[1].childNodes[2].innerText = 'read this one'
            }
            
         
        })
        document.querySelector('.cancel-update').addEventListener('click', () => {
            updateRatingBox.classList.add('hide');
            main.classList.remove('faded');
            addBookBtn.classList.remove('hide');
            ratingDiv.classList.remove('hide')
        });
    }
}


addBookBtn.addEventListener('click', showForm)
main.addEventListener('click', checkClickedElement)




const book01 = new Book("Wizard's First Rule", "Terry Goodkind", 836, true, 10);
const book02 = new Book("Stone of Tears", "Terry Goodkind", 979, true, 8.5)
const book03 = new Book("The Name of the Wind", "Patrick Rothfuss", 662, true, 9.0);
const book04 = new Book("the Wise Man's Fear", "Patrick Rothfuss", 994, false, 0);
myLibrary.push(book01)
myLibrary.push(book02)
myLibrary.push(book03)
myLibrary.push(book04)
createNewCard(book01)
createNewCard(book02)
createNewCard(book03)
createNewCard(book04)

        // const cardID = e.target.parentElement.parentElement.id
        // const thisCard = e.target.parentElement.parentElement
        // console.log(e.target)
        // console.log(cardID)
        // console.log(thisCard)
        // e.target.classList.add('hide');
        // main.classList.add('faded');
        // addBookBtn.classList.add('hide');

        

        // const ratingInput2 = document.querySelector('.rating2');
        // console.log(ratingInput2)
        // const ratingOutput2 = document.querySelector('.rating-output2');
        // console.log(ratingOutput2)
        // ratingOutput2.innerText = ratingInput2.value;
        // ratingInput2.addEventListener('input', () => {
        //     ratingOutput2.innerText = ratingInput2.value;
        // });

        // const updateOkBtn = document.querySelector('.update-rating-ok');
        // const ratingDiv = e.target;
        // updateOkBtn.addEventListener('click', () => {
        //     console.log(e.target)
        //     if (e.target.parentElement.parentElement.id === cardID) {
        //         // ratingDiv.parentElement.parentElement.childNodes[1].childNodes[2].innerText = 'Read';
        //         
        //         e.target.parentElement.parentElement.childNodes[1].childNodes[3].innerText = `${ratingInput2.value}/10`;
        //         // ratingDiv.parentElement.parentElement.childNodes[1].childNodes[3].style.color = 'yellow'
        //         updateRatingBox.classList.add('hide');
        //         main.classList.remove('faded');
        //         addBookBtn.classList.remove('hide');
        //     }

        // });
