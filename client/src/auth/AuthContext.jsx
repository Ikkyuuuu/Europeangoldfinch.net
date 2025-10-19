import { createContext, useMemo, useState } from "react";
import { login as apiLogin } from "../api/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (payload) => {
        const data = await apiLogin(payload);  // { token, user }
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        return data.user;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const value = useMemo(() => ({ user, token, login, logout }), [user, token]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
