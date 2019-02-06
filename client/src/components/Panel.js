import React from "react";
import Link from "./Link";

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkUrl: "",
      linkTitle: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.linkUrl || !this.state.linkTitle) {
      alert("Please enter both a link URL and a link title");
    } else {
      alert("The new link will be to " + this.state.linkTitle + " at " + this.state.linkUrl);
    }
    this.setState({
      linkUrl: "",
      linkTitle: ""
    });
  }

  render() {
    const { browser, selectedPage, editMode, thisColumn, id } = this.props;
    const { panelType, panelTitle, links } = browser.pages[selectedPage].columns[thisColumn].panels[id];

    if (panelType === "linkPanel") {
      return (
        <div className="panel">
          <div className="panelTitle">{panelTitle}</div>
          <div>{ links.map((obj, index) =>
            <Link browser={browser} selectedPage={selectedPage} editMode={editMode} thisColumn={thisColumn} linkUrl={obj.linkUrl} linkTitle={obj.linkTitle} key={index} />
          )}</div>
          {editMode && (
            <form onSubmit={this.handleSubmit}>
            {/* <p> Link is: {this.state.linkTitle} @ {this.state.linkUrl}</p> */}
              <input type="text" name="linkUrl" placeholder="www.mywebsite.com" value={this.state.linkUrl} onChange={this.handleChange} />
              <input type="text" name="linkTitle" placeholder="My Web Site Title" value={this.state.linkTitle} onChange={this.handleChange} />
              <input type="submit" value="submit" />
            </form>
          )}
        </div>
      );
    } else {
      // for future widget types
      return null;
    }
  }
}

export default Panel;
