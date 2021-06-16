import axios from "axios";

export default axios.create({
    // setup at next.config.js
    baseURL: process.env.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});