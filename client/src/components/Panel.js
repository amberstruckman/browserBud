import React from "react";
import Link from "./Link";

const Panel = props => {
  const { browser, selectedPage, thisColumn, id } = props;
  const { panelType, panelTitle, links } = browser.pages[selectedPage].columns[thisColumn].panels[id];

  if (panelType === "linkPanel") {
    return (
      <div className="panel">
        <div className="panelTitle">{panelTitle}</div>
        <div>{ links.map((obj, index) =>
          <Link browser={browser} selectedPage={selectedPage} thisColumn={thisColumn} linkUrl={obj.linkUrl} linkTitle={obj.linkTitle} key={index} />
        )}</div>
      </div>
    );
  } else if (panelType === "widget") {
    // widgets go here
  }
}

export default Panel;
