import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBook } from "../api";
import { useAuth } from "../context/AuthContext";

export default function AddBook() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        price: "",
        category: "Fiction",
        stock: "",
        coverImage: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        if (!user) {
            setError("Please log in to add a book");
            return;
        }

        setLoading(true);
        try {
            await createBook({
                    ...form,
                    price: Number(form.price),
                    stock: Number(form.stock) || 0,
                },
                token
            );
            navigate("/");
        } catch (err) {
            let message = "Something went wrong";
            if (err && err.response && err.response.data && err.response.data.error) {
                message = err.response.data.error;
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        "Fiction",
        "Poetry",
        "History",
        "Biography",
        "Children's",
        "Short Stories",
        "Programming",
        "Self-Help",
        "General",
    ];

    if (!user) {
        return ( <
            div style = {
                { padding: "5rem 2rem", textAlign: "center", color: "white" } } >
            <
            h1 style = {
                { fontSize: "2rem", marginBottom: "1rem" } } > 🔒Login Required < /h1> <
            p style = {
                { marginBottom: "2rem", opacity: 0.9 } } >
            You must be logged in to submit a book. <
            /p> <
            Link to = "/login"
            style = {
                {
                    display: "inline-block",
                    padding: "0.9rem 2rem",
                    background: "white",
                    color: "#1a1a2e",
                    borderRadius: "25px",
                    textDecoration: "none",
                    fontWeight: "bold",
                }
            } >
            Log In <
            /Link> <
            /div>
        );
    }

    return ( <
        div style = {
            {
                padding: "3rem 2rem",
                display: "flex",
                justifyContent: "center",
                fontFamily: "Georgia, serif",
            }
        } >
        <
        div style = {
            { maxWidth: "700px", width: "100%" } } >
        <
        div style = {
            {
                textAlign: "center",
                color: "white",
                marginBottom: "2rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }
        } >
        <
        h1 style = {
            { fontSize: "2.5rem", marginBottom: "0.5rem", fontWeight: "bold" } } > 📖Add a New Book <
        /h1> <
        p style = {
            { fontSize: "1.05rem", opacity: 0.95 } } >
        Share an Ethiopian book with the community <
        /p> <
        /div>

        <
        div style = {
            {
                background: "white",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }
        } >
        {
            error && ( <
                div style = {
                    {
                        background: "#ffebee",
                        color: "#c62828",
                        padding: "0.9rem 1rem",
                        borderRadius: "8px",
                        marginBottom: "1.5rem",
                        borderLeft: "4px solid #c62828",
                    }
                } >
                ⚠️{ error } <
                /div>
            )
        }

        <
        form onSubmit = { handleSubmit } >
        <
        label style = { labelStyle } > Title * < /label> <
        input style = { inputStyle }
        name = "title"
        placeholder = "e.g. ትኩሳት / Tikusat"
        value = { form.title }
        onChange = { handleChange }
        required /
        >

        <
        label style = { labelStyle } > Author * < /label> <
        input style = { inputStyle }
        name = "author"
        placeholder = "e.g. ስብሐት ገብረ እግዚአብሔር"
        value = { form.author }
        onChange = { handleChange }
        required /
        >

        <
        div style = {
            {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
            }
        } >
        <
        div >
        <
        label style = { labelStyle } > Price($) * < /label> <
        input style = { inputStyle }
        name = "price"
        type = "number"
        step = "0.01"
        placeholder = "14.99"
        value = { form.price }
        onChange = { handleChange }
        required /
        >
        <
        /div> <
        div >
        <
        label style = { labelStyle } > Stock < /label> <
        input style = { inputStyle }
        name = "stock"
        type = "number"
        placeholder = "10"
        value = { form.stock }
        onChange = { handleChange }
        /> <
        /div> <
        /div>

        <
        label style = { labelStyle } > Category < /label> <
        select style = { inputStyle }
        name = "category"
        value = { form.category }
        onChange = { handleChange } >
        {
            categories.map((c) => ( <
                option key = { c }
                value = { c } > { c } <
                /option>
            ))
        } <
        /select>

        <
        label style = { labelStyle } > Cover Image URL < /label> <
        input style = { inputStyle }
        name = "coverImage"
        placeholder = "https://res.cloudinary.com/..."
        value = { form.coverImage }
        onChange = { handleChange }
        />

        {
            form.coverImage && ( <
                div style = {
                    { marginBottom: "1.5rem", textAlign: "center" } } >
                <
                p style = {
                    { color: "#888", fontSize: "0.85rem", marginBottom: "0.5rem" } } >
                Cover preview:
                <
                /p> <
                img src = { form.coverImage }
                alt = "Cover preview"
                onError = {
                    (e) => {
                        e.target.style.display = "none";
                    }
                }
                style = {
                    {
                        maxWidth: "120px",
                        maxHeight: "180px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }
                }
                /> <
                /div>
            )
        }

        <
        label style = { labelStyle } > Description < /label> <
        textarea style = {
            {...inputStyle, minHeight: "110px", resize: "vertical" } }
        name = "description"
        placeholder = "A short summary of the book..."
        value = { form.description }
        onChange = { handleChange }
        />

        <
        div style = {
            {
                display: "flex",
                gap: "1rem",
                marginTop: "1.5rem",
                flexWrap: "wrap",
            }
        } >
        <
        button type = "submit"
        disabled = { loading }
        style = {
            {
                flex: 1,
                minWidth: "200px",
                padding: "0.95rem",
                background: loading ?
                    "#999" :
                    "linear-gradient(135deg, #1a1a2e 0%, #f4a261 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
            }
        } >
        { loading ? "Adding..." : "➕ Add Book" } <
        /button> <
        Link to = "/"
        style = {
            {
                flex: 1,
                minWidth: "150px",
                padding: "0.95rem",
                background: "transparent",
                color: "#1a1a2e",
                border: "2px solid #1a1a2e",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "none",
                textAlign: "center",
                boxSizing: "border-box",
            }
        } >
        Cancel <
        /Link> <
        /div> <
        /form> <
        /div> <
        /div> <
        /div>
    );
}

const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "0.4rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
};

const inputStyle = {
    display: "block",
    width: "100%",
    padding: "0.75rem 1rem",
    marginBottom: "1.3rem",
    borderRadius: "8px",
    border: "2px solid #eee",
    fontSize: "1rem",
    fontFamily: "inherit",
    color: "#1a1a2e",
    background: "#fafafa",
    boxSizing: "border-box",
    outline: "none",
};