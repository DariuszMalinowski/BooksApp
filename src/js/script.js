'use strict';

/*Handlebars*/
const template = Handlebars.compile(
  //document.querySelector('#template-book').innerHTML
);

//Przygotuj referencję do szablonu oraz listy .books-list.
const booksList = dataSource.books;
const bookContainer = document.querySelector('.books-list');
console.log(bookContainer);

//Dodaj nową funkcję render.
function render (){

  //Wewnątrz niej przejdź po każdym elemencie z dataSource.books
  for(let book of booksList){
    //console.log(book);

    //wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
    const generatedHTML = template(book);
    console.log(generatedHTML);
    //Na postawie tego kodu HTML wygeneruj element DOM.
    const element = utils.createDOMFromHTML(generatedHTML);
    console.log(element);
    //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
    bookContainer.appendChild(element);
  }
}

render();