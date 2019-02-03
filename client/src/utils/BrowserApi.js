import axios from "axios";

export default {
    getBrowser: function() {
      var results = axios.get("/api/browser");
      // console.log(results);
      return results;
    },
    putBrowser: function(browserObject) {
      return axios.put("/api/browser", browserObject);
    },

    // addPanel: function(browserObject, page, column, panelType, panelTitle) {
    //   if (panelTitle && (panelType === "linkPanel" || panelType === "todoPanel")) {
    //     const column = browserObject.pages[page].columns[column];
    //     const panel = { panelType: panelType, panelTitle: panelTitle };
    //     if (panelType === "linkPanel") {
    //       panel.links = [];
    //     }
    //     column.push(panel);
    //     console.log(browserObject);
    //   }
    // }







}
