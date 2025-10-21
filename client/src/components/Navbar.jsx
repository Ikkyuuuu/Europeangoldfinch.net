import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "./Navbar.css";

function GitHubIcon(props) {
    return (
        <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
      1.08.58 1.23.82.72 1.2 1.87.86 2.33.65.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82A7.62 7.62 0 0 1 8 3.87c.68.01
      1.37.09 2.01.26 1.53-1.03 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15
      0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8
      c0-4.42-3.58-8-8-8Z"/>
        </svg>
    );
}

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const GitHubLink = (
        <a
            href="https://github.com/Ikkyuuuu/Europeangoldfinch.net"
            target="_blank"
            rel="noopener noreferrer"
            className="egf-icon-link"
            aria-label="Open GitHub repository"
            title="Open GitHub repository"
        >
            <GitHubIcon />
        </a>
    );

    return (
        <div className="egf-bar">
            <div className="egf-shell">
                <nav className="egf-nav">
                    <div className="egf-row">
                        <div className="egf-tabs">
                            <NavLink to="/" end className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}>
                                HOME
                            </NavLink>

                            {user ? (
                                <>
                                    <NavLink to="/#new-post" className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}>
                                        POSTING MESSAGE
                                    </NavLink>
                                    <button type="button" className="egf-tab" onClick={handleLogout}>
                                        LOGOUT
                                    </button>
                                    {GitHubLink}
                                </>
                            ) : (
                                <>
                                    <NavLink to="/register" className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}>
                                        REGISTER
                                    </NavLink>
                                    <NavLink to="/login" className={({ isActive }) => "egf-tab" + (isActive ? " is-active" : "")}>
                                        LOGIN
                                    </NavLink>
                                    {GitHubLink}
                                </>
                            )}
                        </div>

                        {user?.username && <div className="egf-user">@{user.username}</div>}
                    </div>
                </nav>

                <div className="egf-banner">
                    <img src="/banner.png" alt="Europeangoldfinch banner" />
                </div>
            </div>
        </div>
    );
}
