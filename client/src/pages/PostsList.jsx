import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";   // <— useLocation added
import { listAll } from "../api/posts";
import useAuth from "../auth/useAuth";
import NewPost from "./NewPost";
import "./postslist.css";

function fmtDate(value) {
    const d = new Date(value);
    if (isNaN(d)) return "";
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}/${dd}`;
}

export default function PostsList() {
    const [data, setData] = useState({ items: [], page: 1, limit: 20, total: 0 });
    const { user } = useAuth();
    const loc = useLocation();                          // <— read the hash

    useEffect(() => {
        listAll().then(setData).catch(console.error);
    }, []);

    // Smooth-scroll to #new-post when coming from the tab
    useEffect(() => {
        if (loc.hash === "#new-post") {
            requestAnimationFrame(() => {
                document.getElementById("new-post")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
        }
    }, [loc]);

    return (
        <div className="home-page">
            {/* --- LIST --- */}
            <div className="list-box">
                <div className="list-head">New Postings</div>

                <div className="list-table" role="table" aria-label="New Postings">
                    {data.items.map((p) => {
                        const author = p.user?.username || p.user_username || "anonymous";
                        const date =
                            p.created_at || p.createdAt || p.createdAtUtc || p.created_at_utc;

                        return (
                            <div className="list-row" role="row" key={p.id}>
                                <div className="list-author" role="cell">
                                    <span className="list-user">{author}</span>
                                    <span className="list-date">{fmtDate(date)}</span>
                                </div>
                                <div className="list-title" role="cell">
                                    <Link to={`/posts/${p.id}`} className="list-link">
                                        {p.topic || p.title || "(no topic)"}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- NEW POST BELOW LIST (only when logged in) --- */}
            {user && (
                <div id="new-post" className="home-newpost">   {/* <— anchor id */}
                    <NewPost />
                </div>
            )}
        </div>
    );
}
