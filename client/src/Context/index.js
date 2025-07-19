import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })


axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem("auth")
        try {
            if(data){
                const parseData = JSON.parse(data)
                if (parseData && parseData.user && parseData.token) {
                    setAuth({
                        ...auth,
                        user: parseData.user,
                        token: parseData.token  
                    })
                }
            }
        } catch (error) {
            console.error("Error parsing auth data from localStorage:", error)
        }
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

