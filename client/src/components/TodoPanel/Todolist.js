import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import TodoApi from "../../utils/TodoApi";


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
          };
          
          this.addItem = this.addItem.bind(this);
          this.deleteItem = this.deleteItem.bind(this);
          this.addReponseToState = this.addReponseToState.bind(this);
          TodoApi.getTodoList().then(this.addReponseToState);
        }
      
      addReponseToState(response) {
        this.setState((prevState) => {
          return {
            items: prevState.items.concat(response.data)
          };
        });
      }
       
      addItem(e) {
     
        if (this._inputElement.value !== "") {
            var newItem = {
              item: this._inputElement.value
              //key: Date.now()
            };
            // TodoApi.createTodo(newItem).then(this.addReponseToState);
            TodoApi.createTodo(newItem, this.deleteItem).then(this.addReponseToState);
           
            this._inputElement.value = "";
          }
           
          console.log(this.state.items);
             
          e.preventDefault();
        }


        
        deleteItem(key) {
          TodoApi.removeTodo(key);
            var filteredItems = this.state.items.filter(function (item) {
              return (item._id !== key);
            });
           
            this.setState({
              items: filteredItems
            });
          }
    
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
          <input ref={(a) => this._inputElement = a}>
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items}
        delete={this.deleteItem}/>
      </div>
    );
  }
}
 
export default TodoList;