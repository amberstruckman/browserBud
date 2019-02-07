import React from "react";
import { Link } from "react-router-dom";

const Header = props => {

  const { user, _logout, loggedIn } = props;

  if (!loggedIn) {
    return (
      <div id="header" className="Header">
      <img id="logo" src="../images/tinybrowserbud.png" alt="BrowserBud" />
      <h1 className="appHeader">BrowserBud!</h1>
			<p className="greeting">Please <Link to="/signup">sign up</Link> or <Link to="/login">login</Link></p>
		  </div>
    )
  } else {
    return (
      <div id="header" className="Header">
      <img id="logo" src="../images/tinybrowserbud.png" alt="BrowserBud" />
      <h1 className="appHeader">BrowserBud!</h1>
			<p className="greeting"><Link to="#" className="nav-link" onClick={_logout}>Logout {user.local.email}</Link></p>
		  </div>
    )
  }
}

export default Header
