'use strict';

/*Handlebars*/
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

//Elementy
const booksList = dataSource.books;
const bookContainer = document.querySelector('.books-list');
const filtersContainer = document.querySelector('.filters');
const favoriteBooks = [];
console.log(filtersContainer);
const filters = [];
//Dodaj nową funkcję render.

function render (){

  //Wewnątrz niej przejdź po każdym elemencie z dataSource.books
  for(let book of booksList){
    //console.log(book);
    // Obliczanie gradientu rating v
    const ratingBgc = determineRatingBgc(book.rating);
    
    //obliczanie szerokości paska rating
    const ratingWidth = book.rating * 10;
    console.log(ratingWidth);
    // dodajemy te wartości do obiektu dla Handlebars
    const bookData = Object.assign({}, book, {
      ratingBgc: ratingBgc,
      ratingWidth: ratingWidth,
    });
    //wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
    const generatedHTML = template(bookData);
    //console.log(generatedHTML);
    //Na postawie tego kodu HTML wygeneruj element DOM.
    const element = utils.createDOMFromHTML(generatedHTML);
    //console.log(element);
    //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
    bookContainer.appendChild(element);
  }
}

render();

function determineRatingBgc(rating) {
  if (rating < 6) {
    return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)'; // żółty
  } else if (rating >= 6 && rating < 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)'; // jasna zieleń
  } else if (rating >= 8 && rating < 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)'; // ciemna zieleń
  } else { // rating >= 9
    return 'linear-gradient(to bottom, #ff0084 0%, #ff9900 100%)'; // różowo/pomarańcz
  }
}


function initActions(){

  /* Nasluchiwacz na favorite books */
  //dodaje listener na 2 kliknięcia i w nim:
  bookContainer.addEventListener('dblclick', function (event) {
    //blokuje ustawienie domyślne przeglądarki
    event.preventDefault();
    //rodzic to link .book_image
    const parent = event.target.offsetParent;
    console.log(parent);
    //jesli nie kliknięto lub gdzies indziej nie rob nic
    if (!parent || !parent.classList.contains('book__image')) {
      return;
    }
    //+/- class favorite
    parent.classList.toggle('favorite');
    //pobiera z jego data-id identyfikator książki,
    const id = parent.getAttribute('data-id');
    console.log(id);
    // dodajemy lub usuwamy id z tablicy favoriteBooks
    if (!favoriteBooks.includes(id)) {
      favoriteBooks.push(id);
    } else {
      favoriteBooks.splice(favoriteBooks.indexOf(id),1);
    }
    console.log(favoriteBooks);
  });

  filtersContainer.addEventListener('click', function(event){
    if (
      event.target.tagName === 'INPUT' &&
      event.target.type === 'checkbox' &&
      event.target.name === 'filter'
    ) {
      const value = event.target.value;

      if (event.target.checked) {
        filters.push(value);
      } else {
        filters.splice(filters.indexOf(value), 1);
      }

      filterBooks();
    }
  });
}

function filterBooks(){
  for(const book of booksList){

    const bookElem = document.querySelector('.book__image[data-id="' + book.id + '"]');
    console.log(bookElem);
  
    let hidden = false;

    for(const filter of filters){
      if(book.details[filter] !== true) {
        hidden = true;
        break;
      }
    }
 
    if (hidden){
      bookElem.classList.add('hidden');
    } else {
      bookElem.classList.remove('hidden');
    }
  }
}



initActions();
