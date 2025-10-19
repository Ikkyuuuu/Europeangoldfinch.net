// src/pages/Login.jsx
import { useState } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", username: "", password: "" });
    const [err, setErr] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            await login(form);   // accepts either username+password or email+password
            nav("/");
        } catch (e2) {
            setErr(e2?.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={submit} style={{ maxWidth: 420, margin: "24px auto", display: "grid", gap: 12 }}>
            <h2>Login</h2>
            <small>Use username or email + password</small>
            <input placeholder="Username (optional)" value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
            <input placeholder="Email (optional)" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <input type="password" placeholder="Password" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            {err && <div style={{ color: "crimson" }}>{err}</div>}
            <button type="submit">Login</button>
        </form>
    );
}
