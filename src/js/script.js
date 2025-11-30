'use strict';

/*Handlebars*/
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

//Elementy
const booksList = dataSource.books;
const bookContainer = document.querySelector('.books-list');
const favoriteBooks = [];
console.log(favoriteBooks);
//Dodaj nową funkcję render.

function render (){

  //Wewnątrz niej przejdź po każdym elemencie z dataSource.books
  for(let book of booksList){
    //console.log(book);
    //wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
    const generatedHTML = template(book);
    //console.log(generatedHTML);
    //Na postawie tego kodu HTML wygeneruj element DOM.
    const element = utils.createDOMFromHTML(generatedHTML);
    //console.log(element);
    //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
    bookContainer.appendChild(element);
  }
}

render();

function initActions(){

  //const images = bookContainer.querySelectorAll('.book__image');

  //pętla po ksiąkach
  /*for(let image of images){
    console.log(image);*/
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
}

initActions();