import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Home from './components/Home'
import Page from "./components/Page";
import SaveButton from './components/SaveButton'
// import TodoItems from './components/TodoPanel/TodoItems'
import TodoList from './components/TodoPanel/Todolist'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import DayCalendar from './components/Calendar/DayCalendar';

//var destination = document.querySelector("#container")

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li>
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
      user: null,
      browser: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				// console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
          user: response.data.user,
          browser: response.data.browser
				})
			} else {
				this.setState({
					loggedIn: false,
          user: null,
          browser: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		// console.log('logging out')
		axios.post('/auth/logout').then(response => {
			// console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
          user: null,
          browser: null
				})
			}
		})
	}

	_login(email, password) {
		axios
			.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				// console.log(response)
				if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user,
            browser: response.data.browser
          });
				}
			})
	};

	render() {
    if (this.state.loggedIn) {
      return (
        <div className="App">
          <h1>BrowserBud!</h1>
          <Header user={this.state.user} />
          {/* LINKS to our different 'pages' */}
          <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
          {/*  ROUTES */}
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" render={() => <Home user={this.state.user} />} />
          <Route
            exact
            path="/login"
            render={() =>
              <LoginForm
                _login={this._login}
                _googleSignin={this._googleSignin}
              />}
          />
          <Route exact path="/signup" component={SignupForm} />
          {/* <LoginForm _login={this._login} /> */}
          
          <TodoList browser={this.state.browser}/>
					<DayCalendar />

          <SaveButton user={this.state.user} />

          <br />

          <hr />

          <Page pageTitle={this.state.browser.pages[0].pageTitle} columns={this.state.browser.pages[0].columns} />

          {/* <br />
          this.state.browser:<br />
          <code>
            { JSON.stringify(this.state.browser) }
          </code><br /> <br />
          this.state.user:<br />
          <code>
            { JSON.stringify(this.state.user) }
          </code><br /> <br /> */}
        </div>
    )
  } else {
    return (
      <div className="App">
        <h1>BrowserBud!</h1>
        <Header user={this.state.user} />
        {/* LINKS to our different 'pages' */}
        <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
        {/*  ROUTES */}
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" render={() => <Home user={this.state.user} />} />
        <Route
          exact
          path="/login"
          render={() =>
            <LoginForm
              _login={this._login}
              _googleSignin={this._googleSignin}
            />}
        />
        <Route exact path="/signup" component={SignupForm} />
        {/* <LoginForm _login={this._login} /> */}
        
        <br />
        
        {/* <Page pageTitle={this.state.browser.pages[0].pageTitle} columns={this.state.browser.pages[0].columns} /> */}

        {/* <br />
        this.state.browser:<br />
        <code>
          { JSON.stringify(this.state.browser) }
        </code><br /> <br />
        this.state.user:<br />
        <code>
          { JSON.stringify(this.state.user) }
        </code><br /> <br /> */}
      </div>
  )
  }


	}
}

export default DragDropContext(HTML5Backend)(App)
