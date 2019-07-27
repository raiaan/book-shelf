import React from 'react'
import './App.css'
import Home from './HomeComponent'
import Search from './SearchComponent'
import {Switch, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books : []
   }
  }
  changeBookStatus = (book,value)=>{
    book.shelf = value;
    let newState = this.state.books.filter((item)=>item.title !== book.title);
    newState.push(book);
    this.setState({books: newState});
    BooksAPI.update(book,value);
    console.log(this.props.books)
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }
  render() {
    
    return (
      <div className="app">
        <Switch>
              <Route exact path='/' render={()=><Home books={this.state.books}
                                                  changeBookStatus={this.changeBookStatus}/>} />
              <Route path='/Search' render={()=><Search books={this.state.books}
                                                  changeBookStatus={this.changeBookStatus}/>} />
          </Switch>
      </div>
    )
  }
}
export default BooksApp