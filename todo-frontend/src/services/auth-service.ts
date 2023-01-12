import axios, { AxiosResponse } from "axios";
import loginModel from '../models/loginModel'

export const register = (username: string, email: string, password: string): Promise<any> => {
  return axios.post("/Authenticate/register", {
    username,
    email,
    password,
  })
  .catch(function(error) {
        if (error.response) {
            throw Error(error.response.data.message)
        } else if (error.request) {
            throw Error("Server did not respond")
        } else {
            throw Error("Unknown error")
        }
   });
};

export const login = (username: string, password: string): Promise<loginModel> => {
  return axios
  .post<loginModel>("/Authenticate/login", {
    username,
    password,
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  })
  .catch(function(error) {
    if (error.response) {
      if(error.response.status == 401) {
        throw Error("Invalid credentials")
      }
      throw Error(error.message)
    } else if (error.request) {
      throw Error("Server did not respond")
    } else {
      throw Error("Unknown error")
    }
  });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export function getCurrentUser  ():loginModel | undefined {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    let user: loginModel = JSON.parse(userStr);
    return user
  }
  return undefined;
};