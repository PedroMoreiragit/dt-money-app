import axios from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";
import { addTokenRequest } from "../helpers/axios.helper";

const baseURL = Platform.select({
    android: "http://10.0.2.2:3001"
})

export const dtMoneyApi = axios.create({
    baseURL,
})

addTokenRequest(dtMoneyApi);

dtMoneyApi.interceptors.response.use(
    (config) => config,
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(new AppError(error.response.data.message))
        } else {
            return Promise.reject(new AppError("Falha na requisição"));
        }
    })