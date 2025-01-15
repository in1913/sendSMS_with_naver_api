import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            axios.get('http://localhost:3001/user/auth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setUserInfo(response.data.user);
            }).catch((error) => {
                if(error.response.status === 403 ){
                    localStorage.removeItem('token');
                    
                }
            })
        }
    }, []);

    return (
    <UserContext.Provider value={userInfo}>
        {children}
    </UserContext.Provider>
    );
}