import React from "react";

// return a single link

const Link = props => {
  return (
    <div className="Link">
    <p>
      URL: {props.linkUrl}
    </p>
    <p>
      Title: {props.linkTitle}
    </p>
    </div>
  )
}

export default Link;
