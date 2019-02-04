import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import DisplayLinks from "./components/DisplayLinks";
import Page from "./components/Page";
import SaveButton from "./components/SaveButton";
// import TodoItems from "./components/TodoPanel/TodoItems";
import TodoList from "./components/TodoPanel/Todolist";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import DayCalendar from "./components/Calendar/DayCalendar";
import Bubbles from "./components/Bubbles/Bubble";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
      user: null,
      browser: null
		};
		this._logout = this._logout.bind(this);
		this._login = this._login.bind(this);
	}
	componentDidMount() {
		axios.get("/auth/user").then(response => {
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
          user: response.data.user,
          browser: response.data.browser,
          selectedPage: 0
				});
			} else {
				this.setState({
					loggedIn: false,
          user: null,
          browser: null,
          selectedPage: null
				});
			}
		});
	}

	_logout(event) {
		event.preventDefault();
		axios.post("/auth/logout").then(response => {
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
          user: null,
          browser: null,
          selectedPage: null
				});
			}
		});
	}

	_login(email, password) {
		axios.post("/auth/login", {
				email,
				password
			})
			.then(response => {
				if (response.status === 200) {
          this.setState({
            loggedIn: true,
            user: response.data.user,
            browser: response.data.browser,
            selectedPage: 0
          });
				}
			});
  };

	render() {
    if (this.state.loggedIn) {
      return (
        <div className="App">
          {/* <h1>BrowserBud!</h1>
          <Header user={this.state.user} />
          <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}
          <Page browser={this.state.browser} selectedPage={this.state.selectedPage} />
          <SaveButton user={this.state.user} />
          <br /> <hr />
          <Route exact path="/login" render={() =>
              <LoginForm _login={this._login} _googleSignin={this._googleSignin} />}
          />
          <Route exact path="/signup" component={SignupForm} />
          <TodoList browser={this.state.browser}/>
					<Bubbles browser={this.state.browser}/>
					<DayCalendar />
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>BrowserBud!</h1>
          <Header user={this.state.user} />
          <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
          <Route exact path="/login" render={() =>
              <LoginForm _login={this._login} _googleSignin={this._googleSignin} />}
          />
          <Route exact path="/signup" component={SignupForm} />
          <br />
        </div>
      );
    }
	}
}

export default DragDropContext(HTML5Backend)(App);
