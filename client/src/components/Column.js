import React from "react";
import Panel from "./Panel";

// props.panels is an array of objects, each containing panels
// iterate through props.panels using array.map() and return a panel component for each index

const Column = props => {
  let { panels } = props;
  return (
    <td className="column">{ panels.map((obj, index) =>
      <Panel panelType={obj.panelType} panelTitle={obj.panelTitle} links={obj.links} key={index} />
    )}</td>
  );
}

export default Column;
