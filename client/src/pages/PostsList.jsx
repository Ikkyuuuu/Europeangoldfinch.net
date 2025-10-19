// src/pages/PostsList.jsx
import { useEffect, useState } from "react";
import { listAll } from "../api/posts";
import { Link } from "react-router-dom";

export default function PostsList() {
    const [data, setData] = useState({ items: [], page: 1, limit: 20, total: 0 });
    useEffect(() => { listAll().then(setData).catch(console.error); }, []);
    return (
        <div style={{ maxWidth: 720, margin: "24px auto" }}>
            <h2>All Posts</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {data.items.map(p => (
                    <li key={p.id} style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
                        <Link to={`/posts/${p.id}`}><b>{p.topic || "(no topic)"}</b></Link>
                        <div style={{ opacity: .7, fontSize: 13 }}>by {p.user?.username || p.user_username}</div>
                        <div>{p.detail}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
