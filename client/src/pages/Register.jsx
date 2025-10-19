// src/pages/Register.jsx
import { useState } from "react";
import { register } from "../api/users";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [err, setErr] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            await register(form);
            nav("/login");
        } catch (e2) {
            setErr(e2?.response?.data?.error || "Registration failed");
        }
    };

    return (
        <form onSubmit={submit} style={{ maxWidth: 420, margin: "24px auto", display: "grid", gap: 12 }}>
            <h2>Register</h2>
            <input placeholder="Username" value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
            <input placeholder="Email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <input type="password" placeholder="Password" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            {err && <div style={{ color: "crimson" }}>{err}</div>}
            <button type="submit">Create Account</button>
        </form>
    );
}
