import axios from "axios";

const axiosFetch = axios.create({
    baseURL: 'http://localhost:8080/',
    headers:{
        // setContentType: 'aplication/json',
        'Content-Type': 'application/json',
    }
})

export default axiosFetch