import React from 'react';
import memoize from 'lodash.memoize';
import Book from './Book';

const BookList = memoize((props) => {
  const shelfType = props.shelfType;
  if (shelfType === undefined) {
    return null;
  }
  const bookList = shelfType instanceof Array && shelfType.map((book, i) =>
    <li key={book.id}>
      <Book
        bookCover={book.imageLinks && book.imageLinks.thumbnail}
        bookTitle={book.title}
        bookAuthors={book.authors}
        id={book.id}
        selectedShelf={book.shelf}
        onUpdateShelf={props.onUpdateShelf}
      />
    </li>
  );
  return (
    <ol className="books-grid">{bookList}</ol>
  )}, (props) => {
  return props.shelfType;
});

export default BookList;
