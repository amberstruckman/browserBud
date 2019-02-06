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
import Chat from "./components/Chat/Chat"
import Bubbles from "./components/Bubbles/Bubble"
import BrowserApi from "./utils/BrowserApi";
import Forecast from "./components/Weather/Forecast";
import EditMode from "./components/EditMode";
import PageSelect from "./components/PageSelect";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
      user: null,
      browser: null,
      selectedPage: 0,
      editMode: false
		};
		this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.update = this.update.bind(this);
    this.modeChange = this.modeChange.bind(this);
    this.pageSelectChange = this.pageSelectChange.bind(this);
	}
	componentDidMount() {
		axios.get("/auth/user").then(response => {
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
          user: response.data.user,
          browser: response.data.browser,
          selectedPage: 0,
          editMode: false
				});
			} else {
				this.setState({
					loggedIn: false,
          user: null,
          browser: null,
          selectedPage: null,
          editMode: false
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
          selectedPage: null,
          editMode: false
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
            selectedPage: 0,
            editMode: false
          });
				}
			}).catch(error => console.log(error));
  };

  handleSaveClick() {
    const browser = {
      pages: [
        {
          pageTitle: "Here's page one of my super awesome links.",
          columns: [
            {
              panels: [
                {
                  panelType: "linkPanel",
                  panelTitle: "web tools",
                  links: [
                    {
                      linkTitle: "Google",
                      linkUrl: "https://www.google.com"
                    },
                    {
                      linkTitle: "Wikipedia",
                      linkUrl: "https://www.wikipedia.com"
                    }
                  ]
                },
                {
                  panelType: "linkPanel",
                  panelTitle: "social media",
                  links: [
                    {
                      linkTitle: "Facebook",
                      linkUrl: "https://www.facebook.com"
                    },
                    {
                      linkTitle: "Instagram",
                      linkUrl: "https://www.instagram.com"
                    },
                    {
                      linkTitle: "LinkedIn",
                      linkUrl: "https://www.linkedin.com"
                    },
                    {
                      linkTitle: "Reddit",
                      linkUrl: "https://www.reddit.com"
                    }
                  ]
                }
              ]
            },
            {
              panels: [
                {
                  panelType: "linkPanel",
                  panelTitle: "news sources",
                  links: [
                    {
                      linkTitle: "The New York Times",
                      linkUrl: "https://www.nytimes.com"
                    },
                    {
                      linkTitle: "Washington Post",
                      linkUrl: "https://www.washingtonpost.com"
                    },
                    {
                      linkTitle: "National Public Radio",
                      linkUrl: "https://www.npr.org"
                    },
                    {
                      linkTitle: "CNN",
                      linkUrl: "https://www.cnn.com"
                    },
                    {
                      linkTitle: "Seattle Times",
                      linkUrl: "https://www.seattletimes.com"
                    },
                    {
                      linkTitle: "Politico",
                      linkUrl: "https://www.politico.com"
                    }
                  ]
                }
              ]
            },
            {
              panels: [
                {
                  panelType: "linkPanel",
                  panelTitle: "fun stuff",
                  links: [
                    {
                      linkTitle: "Internet Movie Database",
                      linkUrl: "https://www.imdb.com"
                    },
                    {
                      linkTitle: "All Music Guide",
                      linkUrl: "https://www.allmusic.com"
                    },
                    {
                      linkTitle: "Airbnb",
                      linkUrl: "https://www.airbnb.com"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    this.setState({ browser: browser });
    BrowserApi.putBrowser(browser);
  }

  update(browser) {
    this.setState({ browser: browser });
    BrowserApi.putBrowser(browser);
  }

  modeChange(event) {
    this.setState({ editMode: event.target.checked });
  }

  pageSelectChange(event) {
    // return array of pageTitles
    const browser = this.state.browser;
    const pages = browser.pages;
    const pageTitles = pages.map((obj, index) => {
      return obj.pageTitle;
    });
  }

	render() {
    if (this.state.loggedIn) {
      return (
        <div className="App">
          <h1>BrowserBud!</h1>
          <Header user={this.state.user} />
          <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
          {/* <PageSelect browser={this.state.browser} value={this.state.selectedPage} onChange={this.pageSelectChange} /> */}
          <Page
            browser={this.state.browser}
            selectedPage={this.state.selectedPage}
            editMode={this.state.editMode}
            update={this.update} />
          <SaveButton user={this.state.user} onClick={this.handleSaveClick} />
          <EditMode editMode={this.state.editMode} onChange={this.modeChange} />
          <br /> <hr />
          <Route exact path="/login" render={() =>
              <LoginForm _login={this._login} _googleSignin={this._googleSignin} />}
          />
          <Route exact path="/signup" component={SignupForm} />
          <TodoList browser={this.state.browser}/>
					<Bubbles browser={this.state.browser}/>
					<DayCalendar />
					<Chat/>
					<Forecast />
          
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
