import api from "./axios";

export const listAll = (page = 1, limit = 20) =>
    api.get(`/posts?page=${page}&limit=${limit}`).then(r => r.data);

export const listMine = () =>
    api.get("/posts/me").then(r => r.data);

export const getById = (id) =>
    api.get(`/posts/${id}`).then(r => r.data);

export const create = ({ topic, detail }) =>
    api.post("/posts", { topic, detail }).then(r => r.data);
