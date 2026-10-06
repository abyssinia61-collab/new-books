import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL = "abyssinia61@gmail.com";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const menuRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem("ethiobooks_dark");
        if (saved === "true") {
            setDarkMode(true);
            document.body.classList.add("dark-mode");
        }
    }, []);

    const toggleDarkMode = () => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem("ethiobooks_dark", String(next));
        if (next) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setMenuOpen(false);
        setProfileOpen(false);
        logout();
        navigate("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/?q=${encodeURIComponent(search)}`);
            setSearch("");
            setMenuOpen(false);
            setProfileOpen(false);
        }
    };

    // -------- SAFE GUARDS --------
    const isLoggedIn = !!user;
    const isAdmin = isLoggedIn && user.email === ADMIN_EMAIL;

    const initials = isLoggedIn ?
        user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() :
        "?";

    const firstName = isLoggedIn ? user.name.split(" ")[0] : "";

    // -------- MENU ITEMS --------
    const menuItems = [
        { icon: "🏠", label: "Home", to: "/" },
        { icon: "📚", label: "New Books", to: "/new" },
        { icon: "✍️", label: "Authors", to: "/authors" },
        { icon: "💬", label: "Community", to: "/community" },
        { icon: "➕", label: "Submission", to: "/add" },
        { icon: "ℹ️", label: "About Us", to: "/about" },
    ];

    if (isAdmin) {
        menuItems.push({ icon: "👑", label: "Admin", to: "/admin" });
    }

    return ( <
        nav style = {
            {
                background: darkMode ? "#1a1a2e" : "white",
                borderBottom: darkMode ? "1px solid #2a2a3e" : "1px solid #eee",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "background 0.3s ease",
            }
        } >
        <
        div style = {
            { display: "flex", height: "4px" } } >
        <
        div style = {
            { flex: 1, background: "#078930" } }
        /> <
        div style = {
            { flex: 1, background: "#FCDD09" } }
        /> <
        div style = {
            { flex: 1, background: "#DA121A" } }
        /> <
        /div>

        <
        div style = {
            {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.85rem 2rem",
                gap: "2rem",
            }
        } >
        { /* LOGO */ } <
        Link to = "/"
        style = {
            {
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "1.3rem",
                fontWeight: "800",
                color: darkMode ? "white" : "#1a1a2e",
                flexShrink: 0,
                fontFamily: "Georgia, serif",
            }
        } >
        <
        span style = {
            {
                fontSize: "1.5rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                background: "linear-gradient(135deg, #078930, #FCDD09, #DA121A)",
                borderRadius: "8px",
                color: "white",
            }
        } >
        📚
        <
        /span> <
        span >
        Ethio < span style = {
            { color: "#DA121A" } } > Books < /span> <
        /span> <
        /Link>

        { /* RIGHT SIDE */ } <
        div style = {
            {
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                flexShrink: 0,
            }
        } >
        <
        form onSubmit = { handleSearch }
        className = "search-form" >
        <
        span className = "search-icon" > 🔍 < /span> <
        input type = "text"
        placeholder = "Search..."
        value = { search }
        onChange = {
            (e) => setSearch(e.target.value) }
        className = "search-input" /
        >
        <
        button type = "submit"
        className = "search-btn" >
        Go <
        /button> <
        /form>

        { /* PROFILE PILL — only if logged in */ } {
            isLoggedIn && ( <
                div style = {
                    { position: "relative" } }
                ref = { profileRef } >
                <
                button onClick = {
                    () => {
                        setProfileOpen(!profileOpen);
                        setMenuOpen(false);
                    }
                }
                style = {
                    {
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: darkMode ? "#2a2a3e" : "#f7f7f7",
                        border: darkMode ? "2px solid #3a3a4e" : "2px solid #eee",
                        borderRadius: "30px",
                        padding: "0.35rem 0.9rem 0.35rem 0.35rem",
                        cursor: "pointer",
                        fontFamily: "inherit",
                    }
                } >
                <
                div style = {
                    {
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #078930, #FCDD09, #DA121A)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                    }
                } >
                { initials } <
                /div> <
                span style = {
                    {
                        fontSize: "0.82rem",
                        fontWeight: "700",
                        color: darkMode ? "white" : "#1a1a2e",
                        maxWidth: "90px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }
                } >
                { firstName } <
                /span> <
                span style = {
                    { fontSize: "0.6rem", color: "#888" } } > ▼ < /span> <
                /button>

                { /* PROFILE DROPDOWN */ } <
                div style = {
                    {
                        display: profileOpen ? "block" : "none",
                        position: "absolute",
                        top: "calc(100% + 12px)",
                        right: 0,
                        background: darkMode ? "#2a2a3e" : "white",
                        borderRadius: "14px",
                        padding: "0.6rem",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                        border: darkMode ? "1px solid #3a3a4e" : "1px solid #f0f0f0",
                        minWidth: "240px",
                        zIndex: 9999,
                    }
                } >
                <
                div style = {
                    {
                        position: "absolute",
                        top: "-7px",
                        right: "25px",
                        width: "14px",
                        height: "14px",
                        background: darkMode ? "#2a2a3e" : "white",
                        borderTop: darkMode ?
                            "1px solid #3a3a4e" :
                            "1px solid #f0f0f0",
                        borderLeft: darkMode ?
                            "1px solid #3a3a4e" :
                            "1px solid #f0f0f0",
                        transform: "rotate(45deg)",
                    }
                }
                />

                <
                div style = {
                    {
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7rem",
                        padding: "0.8rem",
                        borderBottom: darkMode ?
                            "1px solid #3a3a4e" :
                            "1px solid #f0f0f0",
                        marginBottom: "0.5rem",
                    }
                } >
                <
                div style = {
                    {
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #078930, #FCDD09, #DA121A)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        flexShrink: 0,
                    }
                } >
                { initials } <
                /div> <
                div style = {
                    { overflow: "hidden" } } >
                <
                div style = {
                    {
                        fontWeight: "700",
                        color: darkMode ? "white" : "#1a1a2e",
                        fontSize: "0.9rem",
                    }
                } >
                { user.name } <
                /div> <
                div style = {
                    {
                        color: "#999",
                        fontSize: "0.72rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "160px",
                    }
                } >
                { user.email } <
                /div> <
                /div> <
                /div>

                <
                ProfileOption icon = "👤"
                label = "View Profile"
                onClick = {
                    () => {
                        setProfileOpen(false);
                        navigate("/profile");
                    }
                }
                darkMode = { darkMode }
                /> <
                ProfileOption icon = "⚙️"
                label = "Settings"
                onClick = {
                    () => {
                        setProfileOpen(false);
                        navigate("/settings");
                    }
                }
                darkMode = { darkMode }
                /> <
                ProfileOption icon = { darkMode ? "☀️" : "🌙" }
                label = { darkMode ? "Light Mode" : "Dark Mode" }
                onClick = { toggleDarkMode }
                darkMode = { darkMode }
                isToggle /
                >
                <
                div style = {
                    {
                        borderTop: darkMode ?
                            "1px solid #3a3a4e" :
                            "1px solid #f0f0f0",
                        marginTop: "0.4rem",
                        paddingTop: "0.4rem",
                    }
                } >
                <
                ProfileOption icon = "🚪"
                label = "Logout"
                onClick = { handleLogout }
                darkMode = { darkMode }
                isDanger /
                >
                <
                /div> <
                /div> <
                /div>
            )
        }

        { /* AUTH BUTTONS — only if NOT logged in */ } {
            !isLoggedIn && ( <
                >
                <
                Link to = "/login"
                className = "auth-btn-outline"
                style = {
                    {
                        color: darkMode ? "white" : "#1a1a2e",
                        borderColor: darkMode ? "white" : "#1a1a2e",
                    }
                } >
                Log In <
                /Link> <
                Link to = "/signup"
                className = "auth-btn-solid"
                style = {
                    {
                        background: darkMode ? "white" : "#1a1a2e",
                        color: darkMode ? "#1a1a2e" : "white",
                        borderColor: darkMode ? "white" : "#1a1a2e",
                    }
                } >
                Sign Up <
                /Link> <
                />
            )
        }

        { /* HAMBURGER */ } <
        div style = {
            { position: "relative" } }
        ref = { menuRef } >
        <
        button onClick = {
            () => {
                setMenuOpen(!menuOpen);
                setProfileOpen(false);
            }
        }
        style = {
            {
                background: menuOpen ?
                    darkMode ?
                    "white" :
                    "#1a1a2e" :
                    darkMode ?
                    "#2a2a3e" :
                    "#f7f7f7",
                color: menuOpen ?
                    darkMode ?
                    "#1a1a2e" :
                    "white" :
                    darkMode ?
                    "white" :
                    "#1a1a2e",
                border: darkMode ? "2px solid #3a3a4e" : "2px solid #eee",
                borderRadius: "10px",
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                cursor: "pointer",
                transition: "all 0.2s",
            }
        } >
        ☰
        <
        /button>

        { /* MENU DROPDOWN */ } <
        div style = {
            {
                display: menuOpen ? "block" : "none",
                position: "absolute",
                top: "calc(100% + 12px)",
                right: 0,
                background: darkMode ? "#2a2a3e" : "white",
                borderRadius: "16px",
                padding: "1.5rem",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                border: darkMode ? "1px solid #3a3a4e" : "1px solid #f0f0f0",
                minWidth: "360px",
                zIndex: 9999,
            }
        } >
        <
        div style = {
            {
                position: "absolute",
                top: "-7px",
                right: "18px",
                width: "14px",
                height: "14px",
                background: darkMode ? "#2a2a3e" : "white",
                borderTop: darkMode ?
                    "1px solid #3a3a4e" :
                    "1px solid #f0f0f0",
                borderLeft: darkMode ?
                    "1px solid #3a3a4e" :
                    "1px solid #f0f0f0",
                transform: "rotate(45deg)",
            }
        }
        />

        <
        div style = {
            {
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
            }
        } >
        {
            menuItems.map((item) => ( <
                MenuItem key = { item.to }
                icon = { item.icon }
                label = { item.label }
                to = { item.to }
                onNavigate = {
                    () => setMenuOpen(false) }
                darkMode = { darkMode }
                />
            ))
        } <
        /div> <
        /div> <
        /div> <
        /div> <
        /div>

        <
        style > { `
        .search-form {
          display: flex;
          align-items: center;
          background: ${darkMode ? "#2a2a3e" : "#f7f7f7"};
          border: 2px solid ${darkMode ? "#3a3a4e" : "#eee"};
          border-radius: 30px;
          padding: 0.1rem 0.1rem 0.1rem 0.85rem;
          width: 190px;
          transition: all 0.25s ease;
        }

        .search-form:hover,
        .search-form:focus-within {
          border-color: #FCDD09;
          background: ${darkMode ? "#3a3a4e" : "white"};
          width: 220px;
        }

        .search-icon {
          font-size: 0.85rem;
          color: #888;
          margin-right: 0.25rem;
        }

        .search-input {
          flex: 1;
          padding: 0.5rem 0.2rem;
          border: none;
          background: transparent;
          font-size: 0.82rem;
          color: ${darkMode ? "white" : "#333"};
          outline: none;
          font-family: inherit;
          min-width: 60px;
        }

        .search-input::placeholder {
          color: ${darkMode ? "#888" : "#aaa"};
        }

        .search-btn {
          padding: 0.45rem 0.9rem;
          background: ${darkMode ? "white" : "#1a1a2e"};
          color: ${darkMode ? "#1a1a2e" : "white"};
          border: none;
          border-radius: 22px;
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .auth-btn-outline {
          padding: 0.5rem 1rem;
          border: 2px solid;
          border-radius: 30px;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .auth-btn-solid {
          padding: 0.5rem 1rem;
          border: 2px solid;
          border-radius: 30px;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .search-form {
            width: 130px;
          }
        }

        @media (max-width: 520px) {
          .search-form {
            display: none;
          }
        }
      ` } < /style> <
        /nav>
    );
}

function ProfileOption({ icon, label, onClick, darkMode, isDanger, isToggle }) {
    const [hovered, setHovered] = useState(false);

    return ( <
        button onClick = { onClick }
        onMouseEnter = {
            () => setHovered(true) }
        onMouseLeave = {
            () => setHovered(false) }
        style = {
            {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.7rem",
                width: "100%",
                padding: "0.7rem 0.8rem",
                background: hovered ?
                    isDanger ?
                    "#ffebee" :
                    darkMode ?
                    "#3a3a4e" :
                    "#f8f9fa" :
                    "transparent",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                color: isDanger ?
                    "#DA121A" :
                    darkMode ?
                    "white" :
                    "#1a1a2e",
                fontSize: "0.88rem",
                fontWeight: "600",
                fontFamily: "inherit",
                textAlign: "left",
            }
        } >
        <
        span style = {
            { display: "flex", alignItems: "center", gap: "0.7rem" } } >
        <
        span style = {
            { fontSize: "1.05rem" } } > { icon } < /span> <
        span > { label } < /span> <
        /span> {
            isToggle && ( <
                span style = {
                    {
                        display: "inline-flex",
                        alignItems: "center",
                        width: "36px",
                        height: "20px",
                        background: darkMode ? "#078930" : "#ddd",
                        borderRadius: "10px",
                        padding: "2px",
                    }
                } >
                <
                span style = {
                    {
                        width: "16px",
                        height: "16px",
                        background: "white",
                        borderRadius: "50%",
                        transform: darkMode ? "translateX(16px)" : "translateX(0)",
                        transition: "transform 0.2s",
                    }
                }
                /> <
                /span>
            )
        } <
        /button>
    );
}

function MenuItem({ icon, label, to, onNavigate, darkMode }) {
    const [hovered, setHovered] = useState(false);

    return ( <
        Link to = { to }
        onClick = { onNavigate }
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        div onMouseEnter = {
            () => setHovered(true) }
        onMouseLeave = {
            () => setHovered(false) }
        style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem",
                borderRadius: "10px",
                cursor: "pointer",
                background: hovered ?
                    darkMode ?
                    "#3a3a4e" :
                    "#f8f9fa" :
                    "transparent",
            }
        } >
        <
        div style = {
            {
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: darkMode ? "2px solid #3a3a4e" : "2px solid #e5e5e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.15rem",
                background: darkMode ? "#2a2a3e" : "white",
            }
        } >
        { icon } <
        /div> <
        span style = {
            {
                fontSize: "0.78rem",
                fontWeight: "600",
                color: darkMode ? "white" : "#333",
                textAlign: "center",
            }
        } >
        { label } <
        /span> <
        /div> <
        /Link>
    );
}