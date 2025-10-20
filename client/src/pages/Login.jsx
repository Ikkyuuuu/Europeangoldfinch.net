import { useState } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import "../pages/auth.css";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", username: "", password: "" });
    const [err, setErr] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setSubmitting(true);
        try {
            await login(form); // accepts username+password OR email+password
            nav("/");
        } catch (e2) {
            setErr(e2?.response?.data?.error || "Login failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-wrap" role="region" aria-label="Login form">
            <div className="auth-header">LOGIN</div>

            <div className="auth-card">
                <form className="auth-form" onSubmit={submit}>

                    <input
                        className="auth-input"
                        placeholder="Username (optional)"
                        autoComplete="username"
                        value={form.username}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, username: e.target.value }))
                        }
                    />
                    <input
                        className="auth-input"
                        placeholder="Email (optional)"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, password: e.target.value }))
                        }
                    />

                    {err && <div className="auth-error">{err}</div>}

                    <div className="auth-actions">
                        <button className="auth-btn primary" type="submit" disabled={submitting}>
                            {submitting ? "Signing in…" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
