import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import BookComponent from './BookComponent'
class Home extends Component{
    render(){
        return (<div className="list-books">
        <div className="list-books-title">
          <header className="shelf-header">
          <p>MyReads</p>
          <ul>
            <li><a href='#current'>Currently Reading</a></li>
            <li><a href='#want'>Want to read</a></li>
            <li><a href='#read'>read</a></li>
          </ul>
        </header>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf" id="current">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookComponent books= {this.props.books.filter(book => book.shelf ==='currentlyReading')}
                              onChangeStatus = {this.changeBookStatus}/>
            </div>
            <div className="bookshelf" id="want">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookComponent books= {this.props.books.filter(book => book.shelf ==='wantToRead') }
                              onChangeStatus = {this.props.changeBookStatus}/>
            </div>
            <div className="bookshelf" id='read'>
              <h2 className="bookshelf-title">Read</h2>
              <BookComponent books= {this.props.books.filter(book => book.shelf ==='read') }
                              onChangeStatus = {this.changeBookStatus}/>
            </div>
          </div>
        </div>
        <div className="open-search">
          
         <Link to="/search">open search page</Link>
        </div>
      </div>);
        
    }
}
export default Home;