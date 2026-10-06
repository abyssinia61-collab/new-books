import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getPosts,
    createPost,
    likePost,
    addComment,
    deletePost,
} from "../api";
import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL = "abyssinia61@gmail.com";

export default function Community() {
    const { user, token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [commentInputs, setCommentInputs] = useState({});

    // Create post form state
    const [bookTitle, setBookTitle] = useState("");
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const loadPosts = () => {
        getPosts()
            .then((res) => setPosts(res.data))
            .catch(() => setError("Failed to load posts"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        if (!content.trim()) {
            setError("Write something first.");
            return;
        }

        try {
            setSubmitting(true);
            await createPost({ bookTitle, rating, content }, token);
            setContent("");
            setBookTitle("");
            setRating(5);
            loadPosts();
        } catch (err) {
            let message = "Failed to post";
            if (err && err.response && err.response.data && err.response.data.error) {
                message = err.response.data.error;
            }
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLike = async(id) => {
        try {
            await likePost(id);
            loadPosts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async(id) => {
        if (!window.confirm("Delete this post?")) return;
        try {
            await deletePost(id, token);
            loadPosts();
        } catch (err) {
            let message = "Failed to delete post";
            if (err && err.response && err.response.data && err.response.data.error) {
                message = err.response.data.error;
            }
            alert(message);
        }
    };

    const handleCommentChange = (postId, value) => {
        setCommentInputs((prev) => ({...prev, [postId]: value }));
    };

    const handleCommentSubmit = async(e, postId) => {
        e.preventDefault();
        const text = (commentInputs[postId] || "").trim();
        if (!text) return;
        try {
            await addComment(postId, text, token);
            setCommentInputs((prev) => ({...prev, [postId]: "" }));
            loadPosts();
        } catch (err) {
            alert("Failed to add comment");
        }
    };

    const timeAgo = (dateStr) => {
        if (!dateStr) return "";
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "just now";
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;
        return new Date(dateStr).toLocaleDateString();
    };

    const canDelete = (post) => {
        if (!user) return false;
        return post.userName === user.name || user.email === ADMIN_EMAIL;
    };

    return ( <
        div style = {
            { padding: "3rem 2rem", fontFamily: "Georgia, serif" } } > { /* HEADER */ } <
        div style = {
            {
                textAlign: "center",
                color: "white",
                marginBottom: "2.5rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }
        } >
        <
        h1 style = {
            { fontSize: "2.8rem", marginBottom: "0.5rem", fontWeight: "bold" } } > 💬Community <
        /h1> <
        p style = {
            { fontSize: "1.1rem", opacity: 0.95 } } >
        See what readers are saying about Ethiopian books <
        /p> <
        /div>

        <
        div style = {
            { maxWidth: "750px", margin: "0 auto" } } > { /* CREATE POST FORM */ } {
            user ? ( <
                div style = {
                    {
                        background: "white",
                        borderRadius: "16px",
                        padding: "1.8rem",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        marginBottom: "2rem",
                        borderTop: "4px solid #f4a261",
                    }
                } >
                <
                h2 style = {
                    {
                        fontSize: "1.15rem",
                        marginBottom: "1rem",
                        color: "#1a1a2e",
                    }
                } >
                ✍️Share Your Experience <
                /h2>

                {
                    error && ( <
                        p style = {
                            {
                                background: "#ffebee",
                                color: "#c62828",
                                padding: "0.7rem 1rem",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                                fontSize: "0.9rem",
                            }
                        } >
                        { error } <
                        /p>
                    )
                }

                <
                form onSubmit = { handleSubmit } >
                <
                input type = "text"
                placeholder = "Which book? (optional)"
                value = { bookTitle }
                onChange = {
                    (e) => setBookTitle(e.target.value) }
                style = { inputStyle }
                />

                <
                div style = {
                    { marginBottom: "1rem" } } >
                <
                label style = {
                    {
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        color: "#1a1a2e",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "block",
                        marginBottom: "0.4rem",
                    }
                } >
                Your rating <
                /label> <
                div style = {
                    { display: "flex", gap: "0.3rem" } } > {
                    [1, 2, 3, 4, 5].map((n) => ( <
                        button key = { n }
                        type = "button"
                        onClick = {
                            () => setRating(n) }
                        style = {
                            {
                                background: "transparent",
                                border: "none",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                padding: 0,
                                opacity: n <= rating ? 1 : 0.25,
                                transition: "opacity 0.2s",
                            }
                        } >
                        ⭐
                        <
                        /button>
                    ))
                } <
                /div> <
                /div>

                <
                textarea placeholder = "What do you think about this book? Share your experience..."
                value = { content }
                onChange = {
                    (e) => setContent(e.target.value) }
                maxLength = { 1000 }
                rows = { 4 }
                style = {
                    {...inputStyle, resize: "vertical", minHeight: "100px" } }
                />

                <
                div style = {
                    {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }
                } >
                <
                span style = {
                    { fontSize: "0.75rem", color: "#999" } } > { content.length }
                /1000 <
                /span> <
                button type = "submit"
                disabled = { submitting }
                style = {
                    {
                        padding: "0.7rem 1.8rem",
                        background: submitting ?
                            "#999" :
                            "linear-gradient(135deg, #1a1a2e 0%, #f4a261 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        cursor: submitting ? "not-allowed" : "pointer",
                    }
                } >
                { submitting ? "Posting..." : "Post →" } <
                /button> <
                /div> <
                /form> <
                /div>
            ) : ( <
                div style = {
                    {
                        background: "white",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        textAlign: "center",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                        marginBottom: "2rem",
                    }
                } >
                <
                p style = {
                    { color: "#666", marginBottom: "1rem", fontSize: "0.95rem" } } > 🔒Log in to share your experience and comment <
                /p> <
                Link to = "/login"
                style = {
                    {
                        display: "inline-block",
                        padding: "0.6rem 1.5rem",
                        background: "#1a1a2e",
                        color: "white",
                        borderRadius: "25px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                    }
                } >
                Log In <
                /Link> <
                /div>
            )
        }

        { /* POSTS FEED */ } {
            loading ? ( <
                p style = {
                    { textAlign: "center", color: "white" } } > Loading posts... < /p>
            ) : posts.length === 0 ? ( <
                div style = {
                    {
                        background: "white",
                        borderRadius: "16px",
                        padding: "3rem",
                        textAlign: "center",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }
                } >
                <
                div style = {
                    { fontSize: "3rem", marginBottom: "0.5rem" } } > 📭 < /div> <
                h3 style = {
                    { color: "#1a1a2e", marginBottom: "0.5rem" } } > No posts yet < /h3> <
                p style = {
                    { color: "#888" } } > Be the first to share your experience! < /p> <
                /div>
            ) : (
                posts.map((post) => ( <
                    div key = { post._id }
                    style = {
                        {
                            background: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            marginBottom: "1.25rem",
                        }
                    } >
                    { /* HEADER */ } <
                    div style = {
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "0.9rem",
                        }
                    } >
                    <
                    div style = {
                        { display: "flex", alignItems: "center", gap: "0.8rem" } } >
                    <
                    div style = {
                        {
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #078930, #FCDD09, #DA121A)",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                        }
                    } >
                    { post.userName.charAt(0).toUpperCase() } <
                    /div> <
                    div >
                    <
                    div style = {
                        { fontWeight: "bold", color: "#1a1a2e" } } > { post.userName } <
                    /div> <
                    div style = {
                        { fontSize: "0.78rem", color: "#999" } } > { timeAgo(post.createdAt) } <
                    /div> <
                    /div> <
                    /div>

                    {
                        post.bookTitle && ( <
                            span style = {
                                {
                                    background: "#f4a261",
                                    color: "white",
                                    padding: "0.3rem 0.8rem",
                                    borderRadius: "20px",
                                    fontSize: "0.75rem",
                                    fontWeight: "bold",
                                    maxWidth: "200px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }
                            } >
                            📖{ post.bookTitle } <
                            /span>
                        )
                    } <
                    /div>

                    { /* RATING */ } <
                    div style = {
                        { marginBottom: "0.7rem", fontSize: "0.95rem" } } > { "⭐".repeat(post.rating) } <
                    span style = {
                        { opacity: 0.2 } } > { "⭐".repeat(5 - post.rating) } < /span> <
                    /div>

                    { /* CONTENT */ } <
                    p style = {
                        {
                            color: "#333",
                            lineHeight: 1.7,
                            fontSize: "1rem",
                            margin: "0 0 1rem",
                            whiteSpace: "pre-wrap",
                        }
                    } >
                    { post.content } <
                    /p>

                    { /* LIKE + COMMENT + DELETE */ } <
                    div style = {
                        {
                            display: "flex",
                            gap: "0.8rem",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #f2f2f2",
                            paddingBottom: "1rem",
                            marginBottom: "1rem",
                        }
                    } >
                    <
                    div style = {
                        { display: "flex", gap: "0.8rem", alignItems: "center" } } >
                    <
                    button onClick = {
                        () => handleLike(post._id) }
                    style = {
                        {
                            background: "transparent",
                            border: "1px solid #eee",
                            borderRadius: "20px",
                            padding: "0.4rem 1rem",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            color: "#666",
                            fontWeight: "bold",
                        }
                    } >
                    ❤️{ post.likes } <
                    /button> <
                    span style = {
                        { fontSize: "0.85rem", color: "#999" } } > 💬{ post.comments ? post.comments.length : 0 }
                    comments <
                    /span> <
                    /div>

                    { /* DELETE button — shows only for owner or admin */ } {
                        canDelete(post) && ( <
                            button onClick = {
                                () => handleDelete(post._id) }
                            onMouseEnter = {
                                (e) => {
                                    e.currentTarget.style.background = "#ffebee";
                                }
                            }
                            onMouseLeave = {
                                (e) => {
                                    e.currentTarget.style.background = "transparent";
                                }
                            }
                            style = {
                                {
                                    background: "transparent",
                                    border: "1px solid #ffcdd2",
                                    color: "#DA121A",
                                    borderRadius: "20px",
                                    padding: "0.4rem 1rem",
                                    cursor: "pointer",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    transition: "all 0.2s",
                                }
                            } >
                            🗑️Delete <
                            /button>
                        )
                    } <
                    /div>

                    { /* COMMENTS LIST */ } {
                        post.comments && post.comments.length > 0 && ( <
                            div style = {
                                { marginBottom: "1rem" } } > {
                                post.comments.map((c, i) => ( <
                                    div key = { i }
                                    style = {
                                        {
                                            background: "#f8f9fa",
                                            borderRadius: "10px",
                                            padding: "0.7rem 1rem",
                                            marginBottom: "0.5rem",
                                            display: "flex",
                                            gap: "0.7rem",
                                        }
                                    } >
                                    <
                                    div style = {
                                        {
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            background: "#1a1a2e",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "0.8rem",
                                            fontWeight: "bold",
                                            flexShrink: 0,
                                        }
                                    } >
                                    { c.userName.charAt(0).toUpperCase() } <
                                    /div> <
                                    div style = {
                                        { flex: 1 } } >
                                    <
                                    div style = {
                                        {
                                            fontWeight: "bold",
                                            fontSize: "0.85rem",
                                            color: "#1a1a2e",
                                        }
                                    } >
                                    { c.userName } <
                                    span style = {
                                        {
                                            fontWeight: "normal",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            marginLeft: "0.5rem",
                                        }
                                    } >
                                    { timeAgo(c.createdAt) } <
                                    /span> <
                                    /div> <
                                    div style = {
                                        { fontSize: "0.9rem", color: "#333" } } > { c.text } <
                                    /div> <
                                    /div> <
                                    /div>
                                ))
                            } <
                            /div>
                        )
                    }

                    { /* ADD COMMENT */ } {
                        user ? ( <
                            form onSubmit = {
                                (e) => handleCommentSubmit(e, post._id) }
                            style = {
                                { display: "flex", gap: "0.5rem" } } >
                            <
                            input type = "text"
                            placeholder = "Write a comment..."
                            value = { commentInputs[post._id] || "" }
                            onChange = {
                                (e) => handleCommentChange(post._id, e.target.value) }
                            style = {
                                {
                                    flex: 1,
                                    padding: "0.6rem 0.9rem",
                                    borderRadius: "22px",
                                    border: "1px solid #eee",
                                    background: "#fafafa",
                                    fontSize: "0.9rem",
                                    outline: "none",
                                    fontFamily: "inherit",
                                }
                            }
                            /> <
                            button type = "submit"
                            style = {
                                {
                                    padding: "0.6rem 1.3rem",
                                    background: "#1a1a2e",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "22px",
                                    cursor: "pointer",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                }
                            } >
                            Post <
                            /button> <
                            /form>
                        ) : ( <
                            p style = {
                                { fontSize: "0.85rem", color: "#999", margin: 0 } } > 🔒{ " " } <
                            Link to = "/login"
                            style = {
                                { color: "#f4a261", fontWeight: "bold" } } >
                            Log in
                            <
                            /Link>{" "}
                            to leave a comment <
                            /p>
                        )
                    } <
                    /div>
                ))
            )
        } <
        /div> <
        /div>
    );
}

const inputStyle = {
    display: "block",
    width: "100%",
    padding: "0.8rem 1rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "2px solid #eee",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    color: "#1a1a2e",
    background: "#fafafa",
    boxSizing: "border-box",
    outline: "none",
};