import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create as createPost } from "../api/posts";
import "./newpost.css";

export default function NewPost() {
    const nav = useNavigate();
    const [form, setForm] = useState({ topic: "", detail: "" });
    const [err, setErr] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const canSend = form.detail.trim().length > 0;

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setSubmitting(true);
        try {
            await createPost(form);               // your API call

            // Option A: hard refresh to Home (recommended to see the new post immediately)
            window.location.assign("/");

            // Option B (alternative): if you prefer to stay on the same route, use:
            // window.location.reload();

            // (No need to call nav("/") when using assign()/reload())
        } catch (e) {
            setErr(e?.response?.data?.error || "Failed to publish.");
            setSubmitting(false);
        }
    };

    return (
        <div className="post-box">
            <div className="post-head">NEW POST</div>

            <form className="post-body" onSubmit={submit}>
                {/* Topic */}
                <div className="post-row">
                    <input
                        className="post-input post-input--topic"
                        placeholder="Topic"
                        value={form.topic}
                        onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                    />
                </div>

                {/* Message */}
                <div className="post-row">
                    <textarea
                        className="post-textarea post-textarea--message"
                        rows={10}
                        placeholder="Message"
                        value={form.detail}
                        onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
                    />
                </div>

                {/* Error */}
                {err && <div className="post-error">{err}</div>}

                {/* Actions */}
                <div className="post-actions">
                    <button
                        type="submit"
                        className="post-submit"
                        disabled={submitting || !canSend}
                    >
                        {submitting ? "Publishing..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    );
}
