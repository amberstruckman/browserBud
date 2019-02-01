import React from "react";
import Link from "./Link";

// props.links is an array of objects, each containing a linkTitle and a linkUrl
// iterate through props.links using array.map() and return a link component for each index

const Panel = props => {
  let { panelType, panelTitle, links } = props;
  console.log(links);
  if (panelType === "linkPanel") {
    return (
      <div className="panel">
        <div className="panelTitle">{panelTitle}</div>
        <div>{ links.map((obj, index) =>
          <Link linkUrl={obj.linkUrl} linkTitle={obj.linkTitle} key={index} />
        )}</div>
      </div>
    );
  } else if (panelType === "widget") {
    // widgets go here
  }
}

export default Panel;
