import React from "react";
import Column from "./Column";

// props.columns is an array of objects, each containing columns
// iterate through props.columns using array.map() and return a column component for each index

const Page = props => {
  let { pageTitle, columns } = props;
  return (
    <table className="page">
      <div className="pageTitle">{pageTitle}</div>
      <div>{ columns.map((obj, index) =>
        <Column panels={obj.panels} key={index} />
      )}</div>
    </table>
  );
}

export default Page;
