import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("ethiobooks_user");
        if (saved) {
            const { user, token } = JSON.parse(saved);
            setUser(user);
            setToken(token);
        }
    }, []);

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem(
            "ethiobooks_user",
            JSON.stringify({ user: userData, token: tokenData })
        );
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("ethiobooks_user");
    };

    return ( <
        AuthContext.Provider value = {
            { user, token, login, logout } } > { children } <
        /AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}