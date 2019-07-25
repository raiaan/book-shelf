import React , {Component} from 'react';
class BookComponent extends Component{
  
    render(){
        return (
          <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map( book =>(<li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.hasOwnProperty('imageLinks')? book.imageLinks.smallThumbnail:'https://us.bgxme.com/images/no-img.png'})` }}></div>
                  <div className="book-shelf-changer">
                  <select  onChange={(e)=>{this.props.onChangeStatus(book,e.target.value)}} defaultValue={book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  <ul>
                  {book.authors !=null ? book.authors.map(author=><li key={author}>{author}</li>) : ''}
                  </ul>
                </div>
              </div>
            </li>))}
          </ol>
        </div>)
    }
}

export default  BookComponent