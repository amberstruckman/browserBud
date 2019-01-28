import axios from "axios";
import AxiosRequestConfig from "axios";

const basePath = "http://localhost:3001/api/browser";

export default {
    getBrowser: function() {
      return axios.get(`${basePath}`);
    },
    putBrowser: function(browserObject) {
      return axios.put(`${basePath}`, browserObject);
    }
}