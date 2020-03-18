

const BOOK_URL = "https://salty-dawn-90176.herokuapp.com//api/book/"
const SEARCH_BOOK_URL = "https://salty-dawn-90176.herokuapp.com//api/search/"
const FIND_REVIEW_BY_TITLE_URL = "https://salty-dawn-90176.herokuapp.com//api/title/"

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