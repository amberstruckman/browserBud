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

  function handleRemoveColumn() {
    let { columns } = browser.pages[selectedPage];
    columns = columns.filter(column => column !== columns[selectedColumn]);
    browser.pages[selectedPage].columns = columns;
    update(browser);
  }

  return (
    <div className="column">{ panels.map((obj, index) =>
      <Panel browser={browser} selectedPage={selectedPage} editMode={editMode} key={index} selectedColumn={selectedColumn} selectedPanel={index} update={update} />
    ) }
    {(editMode && !panels.length) && <div className="minusDiv colPad"><span className="minus" onClick={ function() { handleRemoveColumn() } }>- Remove Column</span></div>}
    {editMode && <div className="plusDiv"><span className="plus" onClick={ function() { handleClick() } }>+ LinkPanel</span></div>}
    </div>
  );

}

export default Column;
