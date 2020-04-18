

const BOOK_URL = 'http://localhost:4000/api/book/'; //"https://salty-dawn-90176.herokuapp.com/api/book/"
const SEARCH_BOOK_URL = 'http://localhost:4000/api/search/';//"https://salty-dawn-90176.herokuapp.com/api/search/"
const FIND_REVIEW_BY_TITLE_URL = 'http://localhost:4000/api/title/';//"https://salty-dawn-90176.herokuapp.com/api/title/"
const FIND_BOOK_BY_AUTHOR_URL = 'http://localhost:4000/api/author/';//"https://salty-dawn-90176.herokuapp.com/api/author/"

export const findBooks = async (query) => {
    let url = SEARCH_BOOK_URL + query;
    let response = await fetch(url);
    return response.json();
  }

export const findDetailByBookId = async(id) => {
  let url = BOOK_URL + id;
  let response = await fetch(url);
  return response.json();
}

export const findReviewsByTitle= async(title) => {
  let url = FIND_REVIEW_BY_TITLE_URL + title;
  let response = await fetch(url);
  return response.json();
}

export const findBookByAuthor = async(authorId) => {
    let url = FIND_BOOK_BY_AUTHOR_URL + authorId;
    let response = await fetch(url);
    return response.json();
}
