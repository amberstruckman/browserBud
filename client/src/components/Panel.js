import React from "react";
import Link from "./Link";
import PanelTitle from "./PanelTitle";

class Panel extends React.Component {

  constructor(props) {
    super(props);
    const { browser, selectedPage, selectedColumn, selectedPanel } = props;
    const { panelTitle } = browser.pages[selectedPage].columns[selectedColumn].panels[selectedPanel];
    this.state = {
      linkUrl: "", 
      linkTitle: "", 
      panelTitleInput: "",
      editTitleMode: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePanelTitleChange = this.handlePanelTitleChange.bind(this);
    this.handleEditTitleClick = this.handleEditTitleClick.bind(this);
    this.setState({ panelTitleInput: panelTitle });
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
      let { browser, selectedPage, selectedColumn, selectedPanel, update } = this.props;
      let { links } = browser.pages[selectedPage].columns[selectedColumn].panels[selectedPanel];
      const newLink = { linkTitle: linkTitle, linkUrl: linkUrl };
      links.push(newLink);
      update(browser);
      this.setState({ linkUrl: "", linkTitle: "" });
    }
  }

  handleClick() {
    const { browser, selectedPage, selectedColumn, selectedPanel, update } = this.props;
    let { panels } = browser.pages[selectedPage].columns[selectedColumn];
    panels = panels.filter(panel => panel !== panels[selectedPanel]);
    browser.pages[selectedPage].columns[selectedColumn].panels = panels;
    update(browser);
  }

  handlePanelTitleChange(event) {
    this.setState({ editTitleMode: false });
  }

  handleEditTitleClick(event) {
    this.setState({ editTitleMode: true });
  }

  render() {
    const { browser, selectedPage, editMode, selectedColumn, selectedPanel, update } = this.props;
    const { panelType, panelTitle, links } = browser.pages[selectedPage].columns[selectedColumn].panels[selectedPanel];
    const { editTitleMode } = this.state;

    if (panelType === "linkPanel") {
      return (
        <div className="panel">
          <div className="panelTitle">

            {(!editTitleMode || !editMode) && panelTitle}

            {editMode && !editTitleMode && <div className="minusDiv"><span className="minus" onClick={() => this.handleEditTitleClick()}>- Edit Title</span></div>}

            {editMode && editTitleMode && <PanelTitle browser={browser} selectedPage={selectedPage} selectedColumn={selectedColumn} selectedPanel={selectedPanel} update={update} onChange={this.handlePanelTitleChange} /> }

          </div>
          <div>{ links.map((obj, index) =>
            <Link
              browser={browser}
              selectedPage={selectedPage}
              editMode={editMode}
              selectedColumn={selectedColumn}
              linkUrl={obj.linkUrl}
              linkTitle={obj.linkTitle}
              selectedPanel={selectedPanel}
              selectedLink={index}
              key={index}
              update={update}
            />
          )}</div>
          {editMode && (
            <form onSubmit={this.handleSubmit}>
              {links.length ? null : <div className="minusDiv"><span className="minus" onClick={() => this.handleClick()}>- Remove LinkPanel</span></div>}
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
