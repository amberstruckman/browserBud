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
            },
            {
              panels: [
                {
                  panelType: "linkPanel",
                  panelTitle: "news sources",
                  links: [
                    {
                      linkTitle: "The New York Times",
                      linkUrl: "https://www.nytimes.com"
                    },
                    {
                      linkTitle: "Washington Post",
                      linkUrl: "https://www.washingtonpost.com"
                    },
                    {
                      linkTitle: "National Public Radio",
                      linkUrl: "https://www.npr.org"
                    },
                    {
                      linkTitle: "CNN",
                      linkUrl: "https://www.cnn.com"
                    },
                    {
                      linkTitle: "Seattle Times",
                      linkUrl: "https://www.seattletimes.com"
                    },
                    {
                      linkTitle: "Politico",
                      linkUrl: "https://www.politico.com"
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
