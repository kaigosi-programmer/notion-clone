import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/v1";
const getToken = () => {
    localStorage.getItem("token");
}
const axiosClient = axios.create({
    baseURL: BASE_URL,
});

//APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
    return {
        config,
        hesders: {
            "Content-Type": "aplication/json",
            authorization: `Bearer ${getToken()}`,//リクエストヘッダーにJWTを付けて送信

        }
    }
});

axiosClient.interceptors.response.use((response)=>{
    return response
},
(err)=>{
    throw err.response;
});

export default axiosClient;