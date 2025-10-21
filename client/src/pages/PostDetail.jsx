// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getById } from "../api/posts";
import { listByPost } from "../api/reply";
import useAuth from "../auth/useAuth";
import NewReply from "../components/NewReply";
import "../pages/postdetail.css";

function formatMMDD(value) {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yy = String(d.getFullYear() % 100).padStart(2, "0");
    return `${mm}/${dd}/${yy}`;
}

export default function PostDetail() {
    const { id } = useParams();
    const { user } = useAuth();

    const [post, setPost] = useState(null);
    const [postErr, setPostErr] = useState("");
    const [loadingPost, setLoadingPost] = useState(true);

    const [replies, setReplies] = useState([]);
    const [loadingReplies, setLoadingReplies] = useState(true);

    useEffect(() => {
        let alive = true;
        setLoadingPost(true);
        setPostErr("");
        getById(id)
            .then((p) => { if (alive) setPost(p); })
            .catch((e) => alive && setPostErr(e?.message || "Failed to load post"))
            .finally(() => alive && setLoadingPost(false));
        return () => { alive = false; };
    }, [id]);

    useEffect(() => {
        if (!post?.id) return;
        let alive = true;
        setLoadingReplies(true);
        listByPost(post.id, { limit: 500 })
            .then((data) => { if (alive) setReplies(data.items || []); })
            .catch(() => { if (alive) setReplies([]); })
            .finally(() => alive && setLoadingReplies(false));
        return () => { alive = false; };
    }, [post?.id]);

    if (loadingPost) {
        return <div style={{ maxWidth: 720, margin: "24px auto" }}>Loading…</div>;
    }
    if (!post) {
        return <div style={{ maxWidth: 720, margin: "24px auto" }}>{postErr || "Post not found"}</div>;
    }

    const username = post.user?.username || post.user_username || "unknown";
    const topic = post.topic || "(no topic)";
    const detail = post.detail || "";
    const createdAt = post.created_at || post.createdAt || post.created_on || post.createdOn;

    return (
        <div className="thread-wrap">
            {/* THREAD CARD (post + replies list) */}
            <div className="thread-card">
                <div className="thread-head">
                    Thread&nbsp;|&nbsp;<Link to="/">return to list</Link>
                </div>

                <div className="thread-title">{topic}</div>

                <div className="thread-row">
                    <div className="thread-author">
                        <div className="name">{username}</div>
                        <span className="date">{formatMMDD(createdAt)}</span>
                    </div>
                    <div className="thread-body">
                        <p>{detail.split("\n")[0]}</p>
                        {detail.split("\n").slice(1).map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                </div>

                {/* Replies section — shown only if there are replies */}
                {!loadingReplies && replies.length > 0 && (
                    <>
                        <div className="thread-replies">
                            {replies.map((r) => (
                                <div className="reply-row" key={r.id}>
                                    <div className="reply-author">
                                        <div className="name">{r.user?.username || r.user_username || "unknown"}</div>
                                        <span className="date">{formatMMDD(r.created_at || r.createdAt)}</span>
                                    </div>
                                    <div className="reply-body">
                                        {String(r.detail || "")
                                            .split("\n")
                                            .map((line, i) => <p key={i}>{line}</p>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* REPLY BOX OUTSIDE THE CARD */}
            {user && (
                <div className="thread-reply-block">
                    <div className="section-header">REPLY</div>
                    <div className="section-panel">
                        <NewReply
                            postId={post.id}
                            onCreated={(r) => setReplies((prev) => [...prev, r])}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
