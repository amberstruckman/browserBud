import React from "react";

const NewPageButton = props => {

  const { browser, update } = props;
  const { pages } = browser;

  function handleClick() {
    const newPage = { pageTitle: "New Page", columns: [] };
    pages.push(newPage);
    update(browser);
  }

  return <div className="newPageButton"><span className="plus" onClick={ function() { handleClick() } }>+ Page</span></div>

}

export default NewPageButton;
