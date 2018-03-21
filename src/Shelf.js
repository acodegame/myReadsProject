import React from 'react';
import BookList from './BookList';

const Shelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <BookList shelfType={props.shelfType} onUpdateShelf={props.onUpdateShelf}/>
      </div>
    </div>
  )
}

export default Shelf;
