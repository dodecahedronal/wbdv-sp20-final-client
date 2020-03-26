# [GoodBooks](https://intense-tor-95063.herokuapp.com)

### API:
Our API is the Goodreads API. Using this API, we intend to allow users to search for their favorite books, authors, and reviews, as well as interact with said books, authors, and reviews. At the current moment in time, we are only able to search books. The following API methods are currently included (though not all are used) in our prototype:

/api/search/:query
/api/book/:id
/api/title/:title
/api/author/:author

The first method, /api/search/:query takes in the given query, such as a book name, series name, or author name, and returns a list of objects that fit that query. At the moment, only books are returned, as we have not yet created a fully functioning and persisted User object.

The method /api/book/:id is called when we click on a book to view the greater details of the book. The book details can only be viewed when we click on the book title in our search results because the click passes in the id of the book to the method.

The methods /api/title/:title and /api/author/:author will eventually be used in our application, but for now, they are just included in the prototype. The title can be used to find reviews of books with that title, and the author can be used to find author information and interact with the author, for example following an author or viewing information about the author.

### SEARCH CRITERIA:
	As our prototype currently only searches on books, there are two main search criteria: title and author. The “title” criteria just has to be non-empty, at which point the API will search for any books containing that specific search substring. For author, because we don’t have users implemented yet, the search will return a list of books written by an author with that name or who have the author’s name included in the book title or in some relevant detail about the book Examples of titles to search include “Eragon” or “percy jackson,” while authors could be “jk rowling,” or “Oscar Wilde”.

### SUMMARY RESULTS: 

The general search results for a query are relevant book titles and images displayed in a list format. 

### DETAILED RESULTS:

Upon clicking a book title, the user is directed to a page with an image of the book, the title, then the summary gotten from the Goodreads API. 
