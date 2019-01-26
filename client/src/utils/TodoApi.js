import axios from "axios";
import AxiosRequestConfig from "axios";

const basePath = "http://localhost:3001/api/todo";

export default {
    //gets saved TodoList
    getTodoList: function () {
        return axios.get(basePath);
    },
    //gets specific Todo by id
    getTodo: function (id) {
        return axios.get(`${basePath}/${id}`);
    },
    createTodo: function (todoItem) {
        return axios.post(basePath, todoItem);
    },
    updateTodo: function (todoItem) {
        return axios.put(`${basePath}/${todoItem.id}`, todoItem);
    },
    removeTodo: function (id) {
        return axios.delete(`${basePath}/${id}`);
    }
}