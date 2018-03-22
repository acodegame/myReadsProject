import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MyCatalogue from './MyCatalogue';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={MyCatalogue} />
        <Route path="/search" exact component={SearchPage} />
      </div>
    )
  }
}

export default BooksApp;
