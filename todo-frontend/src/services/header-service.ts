import loginModel from '../models/loginModel'

export default function authHeader() {
    const userStr: string | null = localStorage.getItem("user");
    let user: loginModel | null = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.accessToken) {
      return { 'Authorization': 'Bearer ' + user.accessToken, 'Content-Type': 'application/json'};
    } else {
      return { 'Content-Type': 'application/json'};
    }
  }