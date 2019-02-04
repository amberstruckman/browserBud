import axios from "axios";

export default {
  getBrowser: function() {
    return axios.get("/api/browser");
  },
  putBrowser: function(browser) {
    return axios.put("/api/browser", browser);
  }
}
