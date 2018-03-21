import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';

const CURRENTLY_READING = 'currentlyReading';
const WANT_TO_READ =  'wantToRead';
const READ = 'read';

class MyCatalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCatalogueData: undefined
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => this.setState({
      myCatalogueData: data
    }));
  }

  onUpdateShelf = (bookId, newShelf) => {
    console.log("**** Callback received by MyCatalogue.js");
    const newCatalogueData = this.state.myCatalogueData.map(book => {
      if (book.id === bookId) {
        const updatedBook = Object.assign({}, book);
        updatedBook.shelf = newShelf;
        return updatedBook;
      }
      return book;
    });
    this.setState({myCatalogueData: newCatalogueData});
  }

  render() {
    if (this.state.myCatalogueData === undefined) {
      return null;
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf shelfName='Currently Reading' shelfType={this.state.myCatalogueData.filter(x => x.shelf === CURRENTLY_READING)} onUpdateShelf={this.onUpdateShelf}/>
            <Shelf shelfName='Want to Read' shelfType={this.state.myCatalogueData.filter(x => x.shelf === WANT_TO_READ)} onUpdateShelf={this.onUpdateShelf}/>
            <Shelf shelfName='Read' shelfType={this.state.myCatalogueData.filter(x => x.shelf === READ)} onUpdateShelf={this.onUpdateShelf}/>
        </div>
        <div className="open-search">
          <Link
            to={{
              pathname: '/search',
              state: { myCatalogueData: this.state.myCatalogueData }
            }}

          >Add a book </Link>
        </div>
      </div>
    )
  }
}

export default MyCatalogue;
