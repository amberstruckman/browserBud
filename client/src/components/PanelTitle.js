import React from "react";

class PanelTitle extends React.Component {

  constructor(props) {
    super(props);
    let { browser, selectedPage, selectedColumn, selectedPanel, update } = props;
    let { panelTitle } = browser.pages[selectedPage].columns[selectedColumn].panels[selectedPanel];
    this.state = {
      panelTitleInput: "",
      editTitleMode: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ panelTitleInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let panelTitleInput = this.state.panelTitleInput;
    if (!panelTitleInput) {
      alert("Please enter a panel title.");
    } else {
      let { browser, selectedPage, selectedColumn, selectedPanel, update } = this.props;
      browser.pages[selectedPage].columns[selectedColumn].panels[selectedPanel].panelTitle = panelTitleInput;
      this.setState({ panelTitleInput: "" });
      update(browser);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="panelTitle"
          value={this.state.panelTitle}
          onChange={this.handleChange}
        />
        <input type="submit" value="Update Title" />
        <hr />
      </form>
    );
  }

}

export default PanelTitle;
