import React from "react";

// return a single link

const Link = props => {

  const { browser, selectedPage, editMode, id, update } = props;

  return (
    <div className="Link">
      {editMode && <div className="minusDiv"><span className="minus">-</span></div>}
      <a href={props.linkUrl}>{props.linkTitle}</a>
    </div>
  )
}

export default Link;
