import React, { Component } from "react";
import FlipMove from "react-flip-move";
import TodoApi from "../../utils/TodoApi"
 
class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item, clickHandler) {

    return <li onClick={() => this.delete(item._id)} 
    key={item._id}>{item.item}</li>
  }

  delete(key) {
    this.props.delete(key);
  }

 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    
    return (
      <ul className="theList">
         <FlipMove duration={250} easing="ease-out">
        {listItems}
      </FlipMove>
      </ul>
    );
  }
};
 
export default TodoItems;