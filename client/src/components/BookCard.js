import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookCard({ book }) {
    const [hover, setHover] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const checkDark = () =>
            setDarkMode(document.body.classList.contains("dark-mode"));
        checkDark();
        const observer = new MutationObserver(checkDark);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    return ( <
        div onMouseEnter = {
            () => setHover(true) }
        onMouseLeave = {
            () => setHover(false) }
        style = {
            {
                border: darkMode ? "1px solid #2a2a3e" : "1px solid #eee",
                borderRadius: "16px",
                padding: "1.5rem 1rem",
                background: darkMode ? "#1a1a2e" : "white",
                boxShadow: hover ?
                    "0 12px 24px rgba(0,0,0,0.25)" :
                    "0 2px 8px rgba(0,0,0,0.06)",
                transform: hover ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }
        } >
        <
        div style = {
            {
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: hover ?
                    "0 8px 20px rgba(0,0,0,0.35)" :
                    "0 4px 12px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                border: "4px solid #FCDD09",
                background: darkMode ? "#2a2a3e" : "#f7f7f7",
                marginBottom: "1rem",
                flexShrink: 0,
            }
        } >
        <
        img src = { book.coverImage }
        alt = { book.title }
        onError = {
            (e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x400/1a1a2e/ffffff?text=${encodeURIComponent(book.title)}`;
            }
        }
        style = {
            {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hover ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.4s ease",
            }
        }
        /> <
        /div>

        {
            book.category && ( <
                span style = {
                    {
                        fontSize: "0.7rem",
                        background: "#f4a261",
                        color: "white",
                        padding: "3px 10px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "0.5rem",
                    }
                } >
                { book.category } <
                /span>
            )
        }

        <
        h3 style = {
            {
                fontSize: "1.05rem",
                margin: "0.4rem 0 0.3rem",
                color: darkMode ? "white" : "#1a1a2e",
                lineHeight: 1.3,
                minHeight: "2.6em",
            }
        } >
        { book.title } <
        /h3>

        <
        p style = {
            {
                color: darkMode ? "#aaa" : "#888",
                margin: "0 0 0.8rem",
                fontSize: "0.9rem",
            }
        } >
        { book.author } <
        /p>

        <
        p style = {
            {
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#f4a261",
                margin: "0 0 1rem",
            }
        } >
        $ { book.price.toFixed(2) } <
        /p>

        <
        Link to = { `/book/${book._id}` }
        style = {
            { width: "100%" } } >
        <
        button style = {
            {
                width: "100%",
                padding: "0.7rem 1rem",
                background: darkMode ? "#4a4a6e" : "#1a1a2e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold",
                letterSpacing: "0.5px",
                transition: "background 0.2s",
            }
        }
        onMouseEnter = {
            (e) => (e.target.style.background = "#f4a261") }
        onMouseLeave = {
            (e) =>
            (e.target.style.background = darkMode ? "#4a4a6e" : "#1a1a2e")
        } >
        View Book <
        /button> <
        /Link> <
        /div>
    );
}