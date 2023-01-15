import axios, { AxiosResponse } from "axios";
import crudEnum from '../models/crudEnum'
import authHeader from "./header-service";

export default function request<T>(body: any, requestType: crudEnum, url: string): Promise<AxiosResponse<T>>  {
    console.log(authHeader())
    let options = {
        headers: authHeader(), 
    }
    switch(requestType) {
        case "GET": 
            return axios.get<T>(url, options);
        
        case "POST": 
            return axios.post<T>(url, body, options);

        case "PUT": 
            return axios.put<T>(url, body, options);

        case "DELETE": 
            return axios.delete<T>(url, options);

        default: 
            throw Error()

    }
} 