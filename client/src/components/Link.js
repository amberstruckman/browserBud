import React from "react";

const Link = props => {

  const { browser, selectedPage, editMode, selectedColumn, selectedPanel, selectedLink, linkUrl, linkTitle, update } = props;

  function handleClick() {
    let { links } = browser.pages[selectedPage].columns[selectedColumn].panels[selectedPanel];
    links = links.filter(link => link !== links[selectedLink]);
    browser.pages[selectedPage].columns[selectedColumn].panels[selectedPanel].links = links;
    update(browser);
  }

  return (
    <div className="Link">
      {editMode && <span className="minus" onClick={ function() { handleClick() } }>-</span>}
      <a href={linkUrl}>{linkTitle}</a>
    </div>
  )
}

export default Link;
