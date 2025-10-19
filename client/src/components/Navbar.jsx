import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "./Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();        // clears token/user
        navigate("/");   // go to Home
    };

    return (
        <div className="egf-bar">
            <div className="egf-shell">
                <nav className="egf-nav">
                    <div className="egf-row">
                        {/* LEFT: tabs */}
                        <div className="egf-tabs">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}
                            >
                                HOME
                            </NavLink>

                            {user ? (
                                <>
                                    <NavLink
                                        to="/posts/new"
                                        className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}
                                    >
                                        POSTING MESSAGE
                                    </NavLink>
                                    <button type="button" className="egf-tab" onClick={handleLogout}>
                                        LOGOUT
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}
                                    >
                                        REGISTER
                                    </NavLink>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}
                                    >
                                        LOGIN
                                    </NavLink>
                                </>
                            )}
                        </div>

                        {/* RIGHT: username (top-right, above banner) */}
                        {user?.username && <div className="egf-user">@{user.username}</div>}
                    </div>
                </nav>

                {/* Banner below the nav */}
                <div className="egf-banner">
                    <img src="/banner.png" alt="Europeangoldfinch banner" />
                </div>
            </div>
        </div>
    );
}
