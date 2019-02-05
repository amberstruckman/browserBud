import React from "react";
import Link from "./Link";

const Panel = props => {

  const { browser, selectedPage, editMode, thisColumn, id } = props;
  const { panelType, panelTitle, links } = browser.pages[selectedPage].columns[thisColumn].panels[id];

  function handleClick() {
    // const newLinkPanel = { panelType: "linkPanel", panelTitle: "new linkPanel", links: [] };
    // panels.push(newLinkPanel);
    // update(browser);
  }

  if (panelType === "linkPanel") {
    return (
      <div className="panel">
        <div className="panelTitle">{panelTitle}</div>
        <div>{ links.map((obj, index) =>
          <Link browser={browser} selectedPage={selectedPage} editMode={editMode} thisColumn={thisColumn} linkUrl={obj.linkUrl} linkTitle={obj.linkTitle} key={index} />
        )}</div>
        <div><span className="plus" onClick={ function() { handleClick() } }>+ Link</span></div>
      </div>
    );
  } else if (panelType === "widget") {
    // widgets go here
  }
  return null;
}

export default Panel;
