import React from "react";
import Column from "./Column";

const Page = props => {

  const { browser, selectedPage, update } = props;
  const { pageTitle, columns } = browser.pages[selectedPage];

  function handleClick() {
    const newColumn = { panels: [] };
    columns.push(newColumn);
    update(browser);
  }

  return (
    <div className="page">
      <div className="pageTitle">{pageTitle}</div>
      <div className="flex-container">{ columns.map((obj, index) =>
        <Column browser={browser} selectedPage={selectedPage} key={index} id={index} update={update} />
      )}
      <div className="column"><span className="plus" onClick={ function() { handleClick() } }>+</span></div>
      </div>
    </div>
  );
}

export default Page;
