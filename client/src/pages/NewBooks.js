import { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookCard from "../components/BookCard";

export default function NewBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        getBooks()
            .then((res) => setBooks(res.data))
            .finally(() => setLoading(false));
    }, []);

    // Get unique categories
    const categories = ["All", ...new Set(books.map((b) => b.category).filter(Boolean))];

    // Filter by category
    let filtered = filter === "All" ? books : books.filter((b) => b.category === filter);

    // Sort
    if (sortBy === "priceLow") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "title") {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    // "newest" is default — API already returns newest first

    if (loading)
        return ( <
            p style = {
                { padding: "3rem", color: "white", textAlign: "center", fontSize: "1.1rem" } } >
            Loading books... <
            /p>
        );

    return ( <
        div style = {
            { padding: "3rem 2rem" } } > { /* HEADER */ } <
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
            { fontSize: "2.8rem", marginBottom: "0.5rem", fontWeight: "bold" } } > 📚New Books <
        /h1> <
        p style = {
            { fontSize: "1.1rem", opacity: 0.95 } } >
        Browse our complete collection of { books.length }
        Ethiopian books <
        /p> <
        /div>

        { /* FILTER BAR */ } <
        div style = {
            {
                maxWidth: "1300px",
                margin: "0 auto 2rem",
                background: "white",
                borderRadius: "16px",
                padding: "1.2rem 1.5rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
            }
        } >
        { /* Category pills */ } <
        div style = {
            {
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                flex: 1,
                minWidth: "250px",
            }
        } >
        {
            categories.map((cat) => ( <
                button key = { cat }
                onClick = {
                    () => setFilter(cat) }
                style = {
                    {
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        border: filter === cat ? "2px solid #1a1a2e" : "2px solid #eee",
                        background: filter === cat ?
                            "linear-gradient(135deg, #1a1a2e 0%, #f4a261 100%)" :
                            "white",
                        color: filter === cat ? "white" : "#333",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }
                } >
                { cat } <
                /button>
            ))
        } <
        /div>

        { /* Sort dropdown */ } <
        div style = {
            { display: "flex", alignItems: "center", gap: "0.5rem" } } >
        <
        label style = {
            { fontSize: "0.85rem", color: "#666", fontWeight: "bold" } } >
        Sort:
        <
        /label> <
        select value = { sortBy }
        onChange = {
            (e) => setSortBy(e.target.value) }
        style = {
            {
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "2px solid #eee",
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#1a1a2e",
                background: "white",
                cursor: "pointer",
            }
        } >
        <
        option value = "newest" > Newest First < /option> <
        option value = "title" > Title(A - Z) < /option> <
        option value = "priceLow" > Price: Low to High < /option> <
        option value = "priceHigh" > Price: High to Low < /option> <
        /select> <
        /div> <
        /div>

        { /* BOOKS GRID */ } {
            filtered.length === 0 ? ( <
                p style = {
                    { textAlign: "center", color: "white", fontSize: "1.1rem" } } >
                No books in this category. <
                /p>
            ) : ( <
                div style = {
                    {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                        gap: "2rem",
                        maxWidth: "1300px",
                        margin: "0 auto",
                    }
                } >
                {
                    filtered.map((book) => ( <
                        BookCard key = { book._id }
                        book = { book }
                        />
                    ))
                } <
                /div>
            )
        } <
        /div>
    );
}