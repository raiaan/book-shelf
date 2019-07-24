import React from 'react'
import './App.css'
import Home from './HomeComponent'
import Search from './SearchComponent'
import {Switch, Route} from 'react-router-dom';
class BooksApp extends React.Component {
  
  render() {
    
    return (
      <div className="app">
        <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/Search' component={Search} />
          </Switch>
      </div>
    )
  }
}
export default BooksApp