import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AuthUser() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    const getUser = () => {
        const userString = sessionStorage.getItem("user");
        const userDetail = JSON.parse(userString);
        return userDetail;
    }

    const navigate = useNavigate();
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    
    const saveToken = (user, token) => {
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate("/dashboard");
    };

    const logout = () => {
        sessionStorage.clear();
    };

    const http = axios.create({
        baseURL: 'https://azdevweb.online/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return { 
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout 
    };
  
}