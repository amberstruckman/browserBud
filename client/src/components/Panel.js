import React from "react";
import Link from "./Link";

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = { linkUrl: "", linkTitle: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let linkUrl = this.state.linkUrl;
    const linkTitle = this.state.linkTitle ? this.state.linkTitle : linkUrl;
    if (!linkUrl) {
      alert("Please enter a link URL.");
    } else {
      if (!/^https?:\/\//i.test(linkUrl)) {
        linkUrl = 'http://' + linkUrl;
      }
      let { browser, selectedPage, thisColumn, id, update } = this.props;
      let { links } = browser.pages[selectedPage].columns[thisColumn].panels[id];
      const newLink = { linkTitle: linkTitle, linkUrl: linkUrl };
      links.push(newLink);
      update(browser);
      this.setState({ linkUrl: "", linkTitle: "" });
    }
  }

  render() {
    const { browser, selectedPage, editMode, thisColumn, id } = this.props;
    const { panelType, panelTitle, links } = browser.pages[selectedPage].columns[thisColumn].panels[id];

    if (panelType === "linkPanel") {
      return (
        <div className="panel">
          <div className="panelTitle">{panelTitle}</div>
          <div>{ links.map((obj, index) =>
            <Link
              browser={browser}
              selectedPage={selectedPage}
              editMode={editMode}
              thisColumn={thisColumn}
              linkUrl={obj.linkUrl}
              linkTitle={obj.linkTitle}
              key={index}
            />
          )}</div>
          {editMode && (
            <form onSubmit={this.handleSubmit}>
              <hr />
              <input
                type="text"
                name="linkUrl"
                placeholder="www.mywebsite.com"
                value={this.state.linkUrl}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="linkTitle"
                placeholder="My Web Site Title"
                value={this.state.linkTitle}
                onChange={this.handleChange}
              />
              <input type="submit" value="add link" />
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
