import axios from "axios";

const TOKEN = "chgj6vpr01qnp48q1v60chgj6vpr01qnp48q1v6g"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})