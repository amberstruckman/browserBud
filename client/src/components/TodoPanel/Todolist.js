import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import TodoApi from "../../utils/TodoApi";
import BrowserApi from "../../utils/BrowserApi";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelType : "todoPanel",
            panelTitle : "todo",
            items: [],
            initialMove: false
          };
          
          this.addItem = this.addItem.bind(this);
          this.createNew = this.createNew.bind(this);
          this.deleteItem = this.deleteItem.bind(this);
          this.addReponseToState = this.addReponseToState.bind(this);
     
        }

        componentDidMount(){
          TodoApi.getTodoList().then(this.addReponseToState);
        }

        createNew(){
          console.log('x: ', this.state.initialMove);
          console.log("xxxx", BrowserApi.getBrowser())

          this.setState({initialMove: true}, () => this.state.initialMove ? 
          console.log("THIS IS this.STATE", this.state) +
          this.props.browser.pages[0].columns[0].panels.push(this.state) +
          console.log("THIS IS THIS.props.browser", this.props.browser) +
          BrowserApi.putBrowser(this.props.browser) +
          this.setState({
              items: [],
              initialMove: false
          }) :
          console.log("Not Success")

          )

          BrowserApi.getBrowser().then(function (resolve){
            console.log(resolve.data)
          })
          // // this.setState() +
          // this.props.browser.pages[0].columns.push(this.state.panels) + console.log(this.props.browser.pages[0].columns) : console.log("NOT SUCCESS"))
          
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
      <div className="todolistbubble">
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
          <input ref={(a) => this._inputElement = a}>
            </input>
            <button type="submit"> ADD </button>
            <button onClick={this.createNew}>DONE</button>
          </form>
        </div>
        <TodoItems entries={this.state.items}
        delete={this.deleteItem}/>
      </div>
      </div>
    );
  }
}
 
export default TodoList;