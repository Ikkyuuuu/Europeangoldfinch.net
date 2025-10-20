// src/pages/Register.jsx
import { useState } from "react";
import { register } from "../api/users";
import { useNavigate } from "react-router-dom";
import "../pages/auth.css";

export default function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [confirm, setConfirm] = useState("");
    const [err, setErr] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const passwordsMismatch = form.password && confirm && form.password !== confirm;

    const submit = async (e) => {
        e.preventDefault();
        setErr("");

        // simple client-side validation
        if (!form.password) {
            setErr("Password is required");
            return;
        }
        if (form.password !== confirm) {
            setErr("Passwords do not match");
            return;
        }

        setSubmitting(true);
        try {
            // send only the fields your API expects
            await register({
                username: form.username,
                email: form.email,
                password: form.password,
            });
            nav("/login");
        } catch (e2) {
            setErr(e2?.response?.data?.error || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-wrap" role="region" aria-label="Register form">
            <div className="auth-header">REGISTER</div>

            <div className="auth-card">
                <form className="auth-form" onSubmit={submit}>
                    <input
                        className="auth-input"
                        placeholder="Username"
                        autoComplete="username"
                        value={form.username}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, username: e.target.value }))
                        }
                    />

                    <input
                        className="auth-input"
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={form.password}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, password: e.target.value }))
                        }
                        aria-invalid={passwordsMismatch ? "true" : "false"}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        aria-invalid={passwordsMismatch ? "true" : "false"}
                    />

                    {/* inline hint if they don't match */}
                    {passwordsMismatch && (
                        <div className="auth-error">Passwords do not match</div>
                    )}

                    {err && <div className="auth-error">{err}</div>}

                    <div className="auth-actions">
                        <button
                            className="auth-btn primary"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Creating…" : "Create Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
