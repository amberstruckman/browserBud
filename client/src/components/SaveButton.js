import React from "react";
import BrowserApi from "../utils/BrowserApi";

function saveData() {
  const browserObject = {
    pages: [
      {
        pageTitle: "Here's page one of my super awesome links.",
        columns: [
          {
            panels: [
              {
                panelType: "linkPanel",
                panelTitle: "web tools",
                links: [
                  {
                    linkTitle: "Google",
                    linkUrl: "https://www.google.com"
                  },
                  {
                    linkTitle: "Wikipedia",
                    linkUrl: "https://www.wikipedia.com"
                  }
                ]
              },
              {
                panelType: "linkPanel",
                panelTitle: "social media",
                links: [
                  {
                    linkTitle: "Facebook",
                    linkUrl: "https://www.facebook.com"
                  },
                  {
                    linkTitle: "Instagram",
                    linkUrl: "https://www.instagram.com"
                  },
                  {
                    linkTitle: "LinkedIn",
                    linkUrl: "https://www.linkedin.com"
                  },
                  {
                    linkTitle: "Reddit",
                    linkUrl: "https://www.reddit.com"
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
          },
          {
            panels: [
              {
                panelType: "linkPanel",
                panelTitle: "fun stuff",
                links: [
                  {
                    linkTitle: "Internet Movie Database",
                    linkUrl: "https://www.imdb.com"
                  },
                  {
                    linkTitle: "All Music Guide",
                    linkUrl: "https://www.allmusic.com"
                  },
                  {
                    linkTitle: "Airbnb",
                    linkUrl: "https://www.airbnb.com"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  BrowserApi.putBrowser(browserObject);
}

const SaveButton = props => {
  return (
    <div>
      <div className="SaveButton">
        <button onClick={ function() { saveData() } }>Save data to /api/browser</button>
      </div>
    </div>
  );
}

export default SaveButton;
