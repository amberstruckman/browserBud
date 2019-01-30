import React from "react";
import BrowserApi from "../utils/BrowserApi";

function saveData() {
  const browserObject = {
    browser: {
      page: {
        title: "Here's the title of the first page",
        columns: [
          {
            linkPanel: {
              title: "first linkPanel title",
              links: [
                {
                  linkTitle: "Google",
                  linkUrl: "https://www.google.com"
                }
              ]
            }
          },
          {
            linkPanel: {
              title: "second linkPanel title",
              links: [
                {
                  linkTitle: "UW",
                  linkUrl: "uw.edu"
                }
              ]
            }
          }
        ]
      }
    }
  };
  BrowserApi.putBrowser(browserObject);
}

const SaveButton = props => {
  return (
    <div className="SaveButton">
      <p>Save data, user:</p>
      <code>
        {JSON.stringify(props)}
      </code>
      <button onClick={function() { saveData() }}>Save data to /api/browser</button>
    </div>
  )
}

export default SaveButton;
