// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getById } from "../api/posts";
import "../pages/postdetail.css"; // contains the thread styles we added

function formatMMDD(dateLike) {
    if (!dateLike) return "";
    const d = new Date(dateLike);
    if (isNaN(d.getTime())) return String(dateLike); // if API already gives a display string

    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yy = String(d.getFullYear() % 100).padStart(2, "0"); // last 2 digits

    return `${mm}/${dd}/${yy}`;
}

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getById(id).then(setPost).catch(console.error);
    }, [id]);

    if (!post) {
        return <div style={{ maxWidth: 720, margin: "24px auto" }}>Loading…</div>;
    }

    const username = post.user?.username || post.user_username || "unknown";
    const topic = post.topic || "(no topic)";
    const detail = post.detail || "";
    const createdAt = post.created_at || post.createdAt || post.created_on || post.createdOn;

    return (
        <div className="thread-wrap">
            <div className="thread-card">
                <div className="thread-head">
                    Thread&nbsp;|&nbsp;<Link to="/">return to list</Link>
                </div>

                <div className="thread-title">
                    {topic}
                </div>

                <div className="thread-row">
                    <div className="thread-author">
                        <div className="name">{username}</div>
                        <span className="date">{formatMMDD(createdAt)}</span>
                    </div>

                    <div className="thread-body">
                        <p>{detail.split("\n")[0]}</p>
                        {detail.split("\n").slice(1).map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
