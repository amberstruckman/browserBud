import React from "react";
import Panel from "./Panel";

// props.panels is an array of objects, each containing panels
// iterate through props.panels using array.map() and return a panel component for each index

const Column = props => {
  let { panels } = props;
  return (
    <div>{ panels.map((obj, index) =>
      <Panel panelType={obj.panelType} panelTitle={obj.panelTitle} links={obj.links} key={index} />
    )}</div>
  );
}

export default Column;
