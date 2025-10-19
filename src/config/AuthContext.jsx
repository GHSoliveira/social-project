import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [whoIsLogged, setWhoIsLogged] = useState(null);

    useEffect(() => {
        const savedLogin = localStorage.getItem("isLoggedIn");
        const savedUser = localStorage.getItem("whoIsLogged");

        if (savedLogin === "true" && savedUser) {
            setIsLoggedIn(true);
            setWhoIsLogged(JSON.parse(savedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, whoIsLogged, setWhoIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
