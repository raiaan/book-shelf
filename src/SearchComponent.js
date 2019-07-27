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
    this.noName = this.noName.bind(this);

  } 
  noName(books) {
    if(books !==[]){
      for(let i = 0;i<books.length;i++){
        let item = this.props.books.find((book)=>book.id === books[i].id);
        if(item){
          books[i]=item
        }else{
          books[i].shelf='none';
        }
      }
    }
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
              this.noName(books);
              this.setState({searchResult: books});
            }
          }else this.setState({searchResult:[]});
        })
      }, 5000);
      
    }
    else{
      this.setState({searchResult: []})
    }
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
              onChangeStatus = {this.props.changeBookStatus}/>  
          }
        </div>
      </div>);
        
    }
}

export default Search;