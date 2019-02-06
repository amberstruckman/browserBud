import React from "react";
import Panel from "./Panel";

const Column = props => {

  const { browser, selectedPage, editMode, id, update } = props;
  const { panels } = browser.pages[selectedPage].columns[id];

  function handleClick() {
    const newLinkPanel = { panelType: "linkPanel", panelTitle: "new linkPanel", links: [] };
    panels.push(newLinkPanel);
    update(browser);
  }

  return (
    <div className="column">{ panels.map((obj, index) =>
      <Panel browser={browser} selectedPage={selectedPage} editMode={editMode} key={index} id={index} thisColumn={id} />
    ) }
    {editMode && <div className="plusDiv"><span className="plus" onClick={ function() { handleClick() } }>+ LinkPanel</span></div>}
    </div>
  );

}

export default Column;
