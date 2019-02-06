import React from "react";

const PageSelect = props => {

  const { browser, selectedPage, onChange } = props;
  const { pages } = browser;

  return (
    <div className="PageSelect">
      <select value={selectedPage} onChange={this.pageSelectChange}>
      { pages.map((obj, index) =>
        <option value={index}>{obj.pageTitle}</option>
      )}
      </select>
    </div>
  );
}

export default PageSelect;
