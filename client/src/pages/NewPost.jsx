// src/pages/NewPost.jsx
import { useState } from "react";
import { create } from "../api/posts";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
    const nav = useNavigate();
    const [form, setForm] = useState({ topic: "", detail: "" });
    const [err, setErr] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const created = await create(form);
            nav(`/posts/${created.id}`);
        } catch (e2) {
            setErr(e2?.response?.data?.error || "Failed to create post");
        }
    };

    return (
        <form onSubmit={submit} style={{ maxWidth: 640, margin: "24px auto", display: "grid", gap: 12 }}>
            <h2>New Post</h2>
            <input placeholder="Topic (optional)" value={form.topic}
                onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} />
            <textarea rows="6" placeholder="Detail" value={form.detail}
                onChange={e => setForm(f => ({ ...f, detail: e.target.value }))} />
            {err && <div style={{ color: "crimson" }}>{err}</div>}
            <button type="submit">Publish</button>
        </form>
    );
}
