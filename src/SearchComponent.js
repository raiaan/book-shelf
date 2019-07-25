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
    query:'',
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
    this.setState({query:searchString});
    if(searchString !==''){
      setTimeout(()=>{
        BooksAPI.search(searchString).then((books)=>{
          if(!books.error)
          { 
            if(this.state.query ===searchString)
            {
              books.forEach(function(element) { element.shelf = "none"; });
              this.setState({searchResult: books})
            }
          }
        })
      }, 5000);
    }
    if(searchString ===''){
      this.setState({searchResult: []})
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