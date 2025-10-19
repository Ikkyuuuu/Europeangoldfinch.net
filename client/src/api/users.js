import api from "./axios";

export const register = ({ username, email, password }) =>
    api.post("/users", { username, email, password }).then(r => r.data);
