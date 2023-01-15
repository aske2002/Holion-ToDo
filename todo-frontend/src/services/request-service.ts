import axios, { AxiosResponse } from "axios";
import crudEnum from '../models/crudEnum'
import authHeader from "./header-service";

export default function request<T>(body: any, requestType: crudEnum, url: string): Promise<AxiosResponse<T>>  {
    const env: string = process.env.NODE_ENV || 'development';
    const baseUrl: string = (env === "production") ? "https://todo-backend-api.azurewebsites.net" : "https://127.0.0.1:7119"
    let options = {
        headers: authHeader(), 
    }
    switch(requestType) {
        case "GET": 
            return axios.get<T>(baseUrl + url, options);
        
        case "POST": 
            return axios.post<T>(baseUrl + url, body, options);

        case "PUT": 
            return axios.put<T>(baseUrl + url, body, options);

        case "DELETE": 
            return axios.delete<T>(baseUrl + url, options);

        default: 
            throw Error()

    }
} 