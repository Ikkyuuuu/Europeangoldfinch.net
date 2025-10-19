// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../api/posts";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    useEffect(() => { getById(id).then(setPost).catch(console.error); }, [id]);
    if (!post) return <div style={{ maxWidth: 720, margin: "24px auto" }}>Loading…</div>;
    return (
        <div style={{ maxWidth: 720, margin: "24px auto" }}>
            <h2>{post.topic || "(no topic)"}</h2>
            <div style={{ opacity: .7 }}>by {post.user?.username || post.user_username}</div>
            <p>{post.detail}</p>
        </div>
    );
}
