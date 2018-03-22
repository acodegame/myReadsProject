import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import { debounce } from 'throttle-debounce';

// Declaring this so as to check if in callSearchAndSync promise, if query has already been cleared.
// Otherwise Promise is setting the state of results of previous query.
var queryState = undefined;

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: undefined
    };
    // Used debounce to give fast UX search and also to improve
    // in the number of ajax calls.
    this.callSearchAndSync = debounce(400, this.callSearchAndSync);
  }

  /*
   * This method gets called for each key event in search field.
   * It is wrapping another method callSearchAndSync.
   * This method is further wrapped in debounce.
   */
  updateQuery = (event) => {
    const query = event.target.value.trim();
    queryState = query;
    if (query.length) {
      this.callSearchAndSync(query);
    } else {
      // Reset the search results to 0 once user has cleared his query.
      this.setState({ results: undefined });
    }
  }

  /*
   * This method calls search API, get the results and sync their shelves
   * with the current catalogue.
   */
  callSearchAndSync(query) {
    BooksAPI.search(query).then(data => {
      if (data.error) {
        return;
      }
      // Sync search results data with the catalogue myCatalogueData
      const searchResultsBookIds = data.map(book => book.id);
      const myCatalogueBookIds = this.props.location.state.myCatalogueData.map(book => book.id);
      //console.log(searchResultsBookIds, myCatalogueBookIds);
      myCatalogueBookIds.forEach((myBookId, myBookIndex) => {
        let searchIndex = searchResultsBookIds.indexOf(myBookId);
        if (searchIndex > -1) {
          // Found book from search results in MyCatalogue
          data[searchIndex].shelf = this.props.location.state.myCatalogueData[myBookIndex].shelf;
        }
      });
      // This is done in order to avoid setting the state by callSearchAndSync promise after the next empty query input.
      if (queryState.length) {
        this.setState({ results: data });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery.bind(this)}/>
          </div>
        </div>
        <div className="search-books-results">
          <BookList shelfType={this.state.results} />
        </div>
      </div>
    )
  }
}

export default SearchPage;
