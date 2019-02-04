import React from "react";
import Column from "./Column";

const Page = props => {
  const { browser, selectedPage } = props;
  const { pageTitle, columns } = browser.pages[selectedPage];
  return (
    <div className="page">
      <div className="pageTitle">{pageTitle}</div>
      <div className="flex-container">{ columns.map((obj, index) =>
        <Column browser={browser} selectedPage={selectedPage} key={index} id={index} />
      )}</div>
    </div>
  );
}

export default Page;
