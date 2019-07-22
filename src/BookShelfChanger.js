import React ,{Component} from 'react';
class  BookShelfChanger extends Component{
    render(){
      
        return(
            <div className="book-shelf-changer">
            <select onChange={()=>this.props.changeStatus} defaultValue={this.props.status}>
              <option value="move" disabled>Move to...</option>
              <option value="1">Currently Reading</option>
              <option value="2">Want to Read</option>
              <option value="3">Read</option>
              <option value="0">None</option>
            </select>
            </div>)
    }
}
export default BookShelfChanger;
