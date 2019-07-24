import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookComponent from './BookComponent'
class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
    searchResult : [],
       
     /**
      * TODO: Instead of using this state variable to keep track of which page
      * we're on, use the URL in the browser's address bar. This will ensure that
      * users can use the browser's back and forward buttons to navigate between
      * pages, as well as provide a good URL they can bookmark and share.
      */
     showSearchPage: false
   }
    this.searchInputChange=this.searchInputChange.bind(this);
    this.changeBookStatus= this.changeBookStatus.bind(this);

  } 
  
  changeBookStatus = (book,value)=>{
    book.shelf = value;
    let newState = this.state.books.filter((item)=>item.title !== book.title);
    newState.push(book);
    this.setState({books: newState});
    BooksAPI.update(book,value);
    console.log(this.state.books)
  }
  searchInputChange(e){
    let searchString = e.target.value;

    if(searchString !==''){
      setTimeout(()=>{
        BooksAPI.search(searchString).then((books)=>{
          if(!books.error)
          {books.forEach(function(element) { element.shelf = "none"; });
            this.setState({searchResult: books})
            }
        })
      }, 5000);
    }
  }
      changeBookStatus = (book,value)=>{
        book.shelf = value;
        console.log(book)
        BooksAPI.update(book,value);
      }
    render(){
        return (<div className="search-books">
        <div className="search-books-bar">
          <Link to='./' className ="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
                type="text" 
                placeholder="Search by title or author"
                defaultValue=""
                onChange={this.searchInputChange}/>

          </div>
        </div>
        <div className="search-books-results">
          {
            <BookComponent books={this.state.searchResult}
              onChangeStatus = {this.changeBookStatus}/>  
          }
        </div>
      </div>);
        
    }
}

export default Search;