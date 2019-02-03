import React from "react";
import Panel from "./Panel";

// function addLinkPanel(column) {
//   console.log(column);
//   const newPanel = {
//     panelType: "linkPanel",
//     panelTitle: "new linkPanel",
//     links: []
//   }
// }

const Column = props => {
  const { browser, selectedPage, id } = props;
  const { panels } = browser.pages[selectedPage].columns[id];
  return (
    <td className="column">{ panels.map((obj, index) =>
      <Panel browser={browser} selectedPage={selectedPage} key={index} id={index} thisColumn={id} />
    ) }
    {/* <button onClick={ function() { addLinkPanel(props.id) } }>add linkPanel</button> */}
    {/* <button onClick={ props.handleAddLinkPanel(props.id) }>add linkPanel</button> */}
    </td>
  );
}

export default Column;
