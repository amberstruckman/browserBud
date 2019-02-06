import React from "react";

const PageSelect = props => {

  const { browser, selectedPage, onChange } = props;
  const { pages } = browser;

  return (
    <div className="PageSelect">
      <select value={selectedPage} onChange={onChange}>
      { pages.map((obj, index) =>
        <option value={index}>{obj.pageTitle}</option>
      )}
      </select>
    </div>
  );
}

export default PageSelect;
