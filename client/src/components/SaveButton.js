import React from "react";
import BrowserApi from "../utils/BrowserApi";

function saveData() {
  const browserObject = {
    browser: {
      pages: [
        {
          pageTitle: "Here's the title of the first page",
          columns: [
            {
              panels: [
                {
                  panelType: "linkPanel",
                  panelTitle: "first linkPanel title",
                  links: [
                    {
                      linkTitle: "Google",
                      linkUrl: "https://www.google.com"
                    }
                  ]
                }
              ]
            },
            {
              panels: [
                {
                  panelType: "linkPanel",
                  panelTitle: "second linkPanel title",
                  links: [
                    {
                      linkTitle: "UW",
                      linkUrl: "https://www.washington.edu"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  };
  BrowserApi.putBrowser(browserObject);
}

const SaveButton = props => {
  return (
    <div className="SaveButton">
      <button onClick={function() { saveData() }}>Save data to /api/browser</button>
    </div>
  )
}

export default SaveButton;
