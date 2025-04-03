    import { createContext, useState, useEffect } from 'react';

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('authToken'); // Check if token exists on page load
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
        setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    };
