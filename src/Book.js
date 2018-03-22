import React, { Component } from 'react';
import { update } from './BooksAPI';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookShelf: undefined
    };
  }

  componentDidMount() {
    this.setState({bookShelf: this.props.selectedShelf});
  }

  //console.log("**** In Book.js ", props);
  render() {
    const onUpdateShelf = event => {
      const selectedShelf = event.target.value;
      this.setState({bookShelf: selectedShelf});
      update(this.props, selectedShelf).then(() => {
        // Updating shelf only when on MyCatalogue page, as on any other page if navigated to MyCatalogue,
        // It already has the logic to get the recent updates from getAll in componentDidMount
        if (this.props.onUpdateShelf) {
          this.props.onUpdateShelf(this.props.id, selectedShelf);
        }
      });
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ this.props.bookCover })` }}></div>
          <div className="book-shelf-changer">
            <select name="selectedShelf" onChange={onUpdateShelf} value={this.state.bookShelf !== undefined ? this.state.bookShelf : "none"}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.bookAuthors && this.props.bookAuthors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;
