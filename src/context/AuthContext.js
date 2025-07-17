import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) setUser(savedUser);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find((u) => u.email === email && u.password === password);
        if (foundUser) {
            localStorage.setItem("user", JSON.stringify(foundUser));
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const register = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const exists = users.some((u) => u.email === email);
        if (exists) return false;

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        return true;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
