import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookComponent from './BookComponent'
//import {Link} from 'react-router-dom'
class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books : [],
       
     /**
      * TODO: Instead of using this state variable to keep track of which page
      * we're on, use the URL in the browser's address bar. This will ensure that
      * users can use the browser's back and forward buttons to navigate between
      * pages, as well as provide a good URL they can bookmark and share.
      */
     showSearchPage: false
   }
    this.changeBookStatus= this.changeBookStatus.bind(this);
    this.searchInputChange=this.searchInputChange.bind(this);
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
      console.log(this.state.books)
    })
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

    setTimeout(()=>{
      BooksAPI.search(searchString).then((books)=>{
        this.setState({books: books})
        console.log(books)
      })
    }, 5000);
  }
  render() {
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
                    defaultValue=""
                    onChange={this.searchInputChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <BookComponent books={this.state.books}
              onChangeStatus = {this.changeBookStatus}/>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookComponent books= {this.state.books.filter(book => book.shelf ==='currentlyReading')}
                                  onChangeStatus = {this.changeBookStatus}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookComponent books= {this.state.books.filter(book => book.shelf ==='wantToRead') }
                                  onChangeStatus = {this.changeBookStatus}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookComponent books= {this.state.books.filter(book => book.shelf ==='read') }
                                  onChangeStatus = {this.changeBookStatus}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default BooksApp