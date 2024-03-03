import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [userToken, setUserToken] = useState(null)

    const [userId, setUserId] = useState(null)
    const token = localStorage.getItem('token');

    const { id } = jwtDecode(token);


    if(id){}

    useEffect(() => {
        if (token) {
            setUserToken(token);
            setUserId(id);
        }
    }, [])


    return <AuthContext.Provider value={{ userToken, setUserToken, userId }}>
        {children}
    </AuthContext.Provider>
}