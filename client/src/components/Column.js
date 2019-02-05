import React from "react";
import Panel from "./Panel";
import BrowserApi from "../utils/BrowserApi";

const Column = props => {

  const { browser, selectedPage, id, update } = props;
  const { panels } = browser.pages[selectedPage].columns[id];

  function handleClick() {
    const newLinkPanel = { panelType: "linkPanel", panelTitle: "new linkPanel", links: [] };
    panels.push(newLinkPanel);
    update(browser);
  }

  return (
    <div className="column">{ panels.map((obj, index) =>
      <Panel browser={browser} selectedPage={selectedPage} key={index} id={index} thisColumn={id} />
    ) }
    <button onClick={ function() { handleClick() } }>add linkPanel</button>
    </div>
  );

}

export default Column;
