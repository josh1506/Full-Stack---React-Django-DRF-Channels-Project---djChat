import axios, {AxiosInstance} from "axios";
import {useNavigate} from "react-router-dom";

import {BASE_URL} from "../config.ts";

const API_BASE_URL = BASE_URL

const useAxiosWithInterceptor = (): AxiosInstance => {
    const jwtAxios = axios.create({baseURL: API_BASE_URL})
    const navigate = useNavigate()

    jwtAxios.interceptors.response.use(
        (response) => {
            return response
        },
        async (err) => {
            const originalRequest = err.config

            if (err.response?.status === 403) {
                const goRoot = () => navigate("/login")
                goRoot()
            }
            throw err
        }
    )
    return jwtAxios
}

export default useAxiosWithInterceptor
