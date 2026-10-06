import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBook, deleteBook } from "../api";
import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL = "abyssinia61@gmail.com";

export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [book, setBook] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getBook(id)
            .then((res) => setBook(res.data))
            .catch(() => setError("Book not found"));
    }, [id]);

    const handleDelete = async() => {
        if (!window.confirm("Delete this book?")) return;
        try {
            await deleteBook(id, token);
            navigate("/");
        } catch (err) {
            let msg = "Failed to delete";
            if (err && err.response && err.response.data && err.response.data.error) {
                msg = err.response.data.error;
            }
            alert(msg);
        }
    };

    if (error)
        return ( <
            p style = {
                { padding: "3rem", color: "white", textAlign: "center" } } > { error } <
            /p>
        );
    if (!book)
        return ( <
            p style = {
                { padding: "3rem", color: "white", textAlign: "center" } } >
            Loading... <
            /p>
        );

    // -------- PERMISSION CHECKS --------
    const userId = user ? user.id || user._id : null;
    const bookOwnerId = book.owner ?
        typeof book.owner === "string" ?
        book.owner :
        book.owner._id || book.owner :
        null;

    const isOwner =
        userId && bookOwnerId && String(bookOwnerId) === String(userId);

    const isAdmin = user && user.email === ADMIN_EMAIL;
    const canDelete = isOwner || isAdmin;

    // Debug (temporary): uncomment to check values
    // console.log("user:", user);
    // console.log("book.owner:", book.owner);
    // console.log("isOwner:", isOwner, "isAdmin:", isAdmin);

    return ( <
        div style = {
            {
                padding: "3rem 2rem",
                display: "flex",
                gap: "3rem",
                flexWrap: "wrap",
                justifyContent: "center",
                fontFamily: "Georgia, serif",
            }
        } >
        { /* COVER */ } <
        div style = {
            {
                width: "300px",
                height: "420px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                border: "4px solid #FCDD09",
                flexShrink: 0,
            }
        } >
        <
        img src = { book.coverImage }
        alt = { book.title }
        onError = {
            (e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/300x420/1a1a2e/ffffff?text=${encodeURIComponent(
              book.title
            )}`;
            }
        }
        style = {
            { width: "100%", height: "100%", objectFit: "cover" } }
        /> <
        /div>

        { /* INFO */ } <
        div style = {
            { maxWidth: "550px", color: "white" } } >
        <
        h1 style = {
            {
                fontSize: "2.2rem",
                marginBottom: "0.5rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }
        } >
        { book.title } <
        /h1>

        <
        p style = {
            { fontSize: "1.2rem", opacity: 0.9, marginBottom: "1.5rem" } } >
        by { book.author } <
        /p>

        <
        p style = {
            {
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "#FCDD09",
                marginBottom: "1.5rem",
            }
        } >
        $ { book.price.toFixed(2) } <
        /p>

        {
            book.category && ( <
                span style = {
                    {
                        display: "inline-block",
                        background: "#f4a261",
                        color: "white",
                        padding: "0.3rem 0.9rem",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "1rem",
                    }
                } >
                { book.category } <
                /span>
            )
        }

        <
        p style = {
            {
                fontSize: "1.05rem",
                lineHeight: 1.8,
                marginBottom: "1rem",
                opacity: 0.95,
            }
        } >
        { book.description || "No description available." } <
        /p>

        <
        p style = {
            { opacity: 0.9, marginBottom: "0.5rem" } } >
        <
        b > In stock: < /b> {book.stock} <
        /p>

        {
            book.ownerName && ( <
                p style = {
                    { opacity: 0.7, fontSize: "0.9rem", marginBottom: "1.5rem" } } >
                Submitted by: < b > { book.ownerName } < /b> <
                /p>
            )
        }

        { /* ACTIONS */ } <
        div style = {
            { display: "flex", gap: "1rem", flexWrap: "wrap" } } >
        <
        Link to = "/"
        style = {
            {
                padding: "0.7rem 1.5rem",
                background: "white",
                color: "#1a1a2e",
                borderRadius: "25px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.9rem",
            }
        } >
        ←Back <
        /Link>

        {
            canDelete && ( <
                button onClick = { handleDelete }
                style = {
                    {
                        padding: "0.7rem 1.5rem",
                        background: "#DA121A",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                    }
                } >
                🗑️Delete <
                /button>
            )
        } <
        /div> <
        /div> <
        /div>
    );
}