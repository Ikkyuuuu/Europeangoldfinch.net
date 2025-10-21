import { useState } from "react";
import { create as createReply } from "../api/reply";
import useAuth from "../auth/useAuth";

export default function NewReply({ postId, onCreated }) {
    const { user, token } = useAuth();
    const [text, setText] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    if (!user) return null;

    const canSend = !!text.trim() && !busy;

    const doSubmit = async (e) => {
        e.preventDefault();
        if (!canSend) return;                     // guard: inert when inactive
        setErr("");
        setBusy(true);
        try {
            const r = await createReply(postId, text.trim(), token || localStorage.getItem("token"));
            setText("");
            onCreated?.(r);
        } catch (e2) {
            setErr(e2.message || "Failed to post reply");
        } finally {
            setBusy(false);
        }
    };

    return (
        <form onSubmit={doSubmit}>
            <textarea
                className="auth-input auth-textarea"
                placeholder="Message"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {err && <div className="auth-error" style={{ marginTop: 8 }}>{err}</div>}
            <div className="auth-actions" style={{ marginTop: 8 }}>
                <button
                    type="submit"
                    className={`auth-btn primary ${!canSend ? "is-inactive" : ""}`}
                    aria-disabled={!canSend}
                    onClick={(e) => { if (!canSend) e.preventDefault(); }}  // extra safety
                >
                    {busy ? "Sending…" : "Send"}
                </button>
            </div>
        </form>
    );
}
