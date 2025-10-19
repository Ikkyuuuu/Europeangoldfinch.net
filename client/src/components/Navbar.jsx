// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
export default function Navbar() {
    const { user, logout } = useAuth();
    return (
        <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
            <Link to="/">All Posts</Link>
            {user && <Link to="/new">New Post</Link>}
            <div style={{ marginLeft: "auto" }}>
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>{" | "}
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <span style={{ marginRight: 8 }}>Hi, {user.username || user.email}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
