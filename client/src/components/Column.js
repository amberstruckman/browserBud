import React from "react";
import Panel from "./Panel";

const Column = props => {

  const { browser, selectedPage, editMode, selectedColumn, update } = props;
  const { panels } = browser.pages[selectedPage].columns[selectedColumn];

  function handleClick() {
    const newLinkPanel = { panelType: "linkPanel", panelTitle: "new linkPanel", links: [] };
    panels.push(newLinkPanel);
    update(browser);
  }

  return (
    <div className="column">{ panels.map((obj, index) =>
      <Panel browser={browser} selectedPage={selectedPage} editMode={editMode} key={index} selectedColumn={index} selectedColumn={selectedColumn} selectedPanel={index} update={update} />
    ) }
    {editMode && <div className="plusDiv"><span className="plus" onClick={ function() { handleClick() } }>+ LinkPanel</span></div>}
    </div>
  );

}

export default Column;
