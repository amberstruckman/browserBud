import React from "react";

// return a single link

const Link = props => {
  return (
    <div className="Link">
      <p><a href={props.linkUrl}>{props.linkTitle}</a></p>
    </div>
  )
}

export default Link;
