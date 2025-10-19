import api from "./axios";

export const login = ({ email, username, password }) =>
    api.post("/auth/login", { email, username, password }).then(r => r.data);

export const me = () =>
    api.get("/auth/me").then(r => r.data); // only if you kept /auth/me
