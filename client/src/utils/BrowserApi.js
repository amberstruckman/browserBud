import axios from "axios";

export default {
    getBrowser: function() {
      var results = axios.get("/api/browser");
      // console.log(results);
      return results;
    },
    putBrowser: function(browserObject) {
      return axios.put("/api/browser", browserObject);
    }
}
