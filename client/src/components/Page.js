import React from "react";
import Column from "./Column";

const Page = props => {
  const { browser, selectedPage } = props;
  const { pageTitle, columns } = browser.pages[selectedPage];
  return (
    <table className="page"><tr>
      <div className="pageTitle">{pageTitle}</div>
      <div>{ columns.map((obj, index) =>
        <Column browser={browser} selectedPage={selectedPage} key={index} id={index} />
      )}</div>
    </tr></table>
  );
}

export default Page;
