import React from "react";
import Link from "./Link";
import { isArray } from "util";

// props.links is an array of objects, each containing a linkTitle and a linkUrl
// iterate through props.links using array.map() and return a link component for each index
// class Panel extends Component {
//   panelType = undefined;
//   panelTitle = undefined;
//   links = undefined;

//   constructor(props) {
//     {panelType} = props;
//   }
//   render() {
//     if (panelType === "linkPanel") {
//       return (
//         <div className="panel">
//           <div className="panelTitle">{panelTitle}</div>
//           <div>{ links.map((obj, index) =>
//             <Link linkUrl={obj.linkUrl} linkTitle={obj.linkTitle} key={index} />
//           )}</div>
//         </div>
//       );
//     } else if (panelType === "widget") {
//       // widgets go here
//     }
//   }
// }
const Panel = props => {
  let { panelType, panelTitle, links } = props;
  console.log(links);
  if (panelType === "linkPanel") {
    if (links && isArray(links)) {
      return (
        <div className="panel">
          <div className="panelTitle">{panelTitle}</div>
          <div>{ links.map((obj, index) =>
            <Link linkUrl={obj.linkUrl} linkTitle={obj.linkTitle} key={index} />
          )}</div>
        </div>
      );
    } else {
      return (
        <div className="panel">
          <div className="panelTitle">{panelTitle}</div>
          <div></div>
        </div>
      );
    }

  } else if (panelType === "widget") {
    // widgets go here
  }
}

export default Panel;
