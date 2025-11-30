'use strict';

class BooksList {
  constructor() {
    this.data = [];
    this.booksListContainer = null;
    this.filtersContainer = null;
    this.favoriteBooks = [];
    this.filters = [];
    this.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

    // inicjalizacja
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }

  initData() {
    this.data = dataSource.books; // pobieramy dane książek
  }

  getElements() {
    this.booksListContainer = document.querySelector('.books-list');
    this.filtersContainer = document.querySelector('.filters');
  }

  render() {
    this.booksListContainer.innerHTML = ''; // czyścimy listę przed renderem
    for (let book of this.data) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

      const bookData = Object.assign({}, book, {
        ratingBgc: ratingBgc,
        ratingWidth: ratingWidth
      });

      const generatedHTML = this.template(bookData);
      const element = utils.createDOMFromHTML(generatedHTML);
      this.booksListContainer.appendChild(element);
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)'; // żółty
    } else if (rating >= 6 && rating < 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)'; // jasna zieleń
    } else if (rating >= 8 && rating < 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)'; // ciemna zieleń
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%, #ff9900 100%)'; // różowo/pomarańcz
    }
  }

  initActions() {
    // ulubione książki - event delegation na całą listę
    this.booksListContainer.addEventListener('dblclick', (event) => {
      event.preventDefault();
      const parent = event.target.offsetParent;
      if (!parent || !parent.classList.contains('book__image')) return;

      parent.classList.toggle('favorite');
      const id = parent.getAttribute('data-id');

      if (!this.favoriteBooks.includes(id)) {
        this.favoriteBooks.push(id);
      } else {
        this.favoriteBooks.splice(this.favoriteBooks.indexOf(id), 1);
      }
      console.log(this.favoriteBooks);
    });

    // filtrowanie
    this.filtersContainer.addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT' &&
          event.target.type === 'checkbox' &&
          event.target.name === 'filter') {

        const value = event.target.value;
        if (event.target.checked) {
          this.filters.push(value);
        } else {
          this.filters.splice(this.filters.indexOf(value), 1);
        }
        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of this.data) {
      const bookElem = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (!bookElem) continue;

      let hidden = false;
      for (const filter of this.filters) {
        if (book.details[filter] !== true) {
          hidden = true;
          break;
        }
      }

      if (hidden) {
        bookElem.classList.add('hidden');
      } else {
        bookElem.classList.remove('hidden');
      }
    }
  }
}

// Tworzymy instancję klasy
/* eslint-disable-next-line no-unused-vars */
const app = new BooksList();

