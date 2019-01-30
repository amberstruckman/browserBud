import axios from "axios";

export default {
    getBrowser: function() {
      return axios.get("/api/browser");
    },
    putBrowser: function(browserObject) {
      return axios.put("/api/browser", browserObject);
    }
}
