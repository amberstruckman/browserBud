import React from "react";

// return a single link

const Link = props => {
  return (
    <div className="Link">
      <a href={props.linkUrl}>{props.linkTitle}</a>
    </div>
  )
}

export default Link;
