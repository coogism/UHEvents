import axios from "axios";

export default axios.create({
    baseURL: "http://api.weabonie.com:8080"
})