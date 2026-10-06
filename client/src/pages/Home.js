import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getBooks } from "../api";
import BookCard from "../components/BookCard";

const FAMOUS_AUTHORS = [
    { name: "በዓሉ ግርማ", latin: "Bealu Girma", famous: "ኦሮማይ", image: "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Bealu_Girma" },
    { name: "ሀዲስ ዓለማየሁ", latin: "Hadis Alemayehu", famous: "ፍቅር እስከ መቃብር", image: "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Hadis_Alemayehu" },
    { name: "ስብሐት ገብረ እግዚአብሔር", latin: "Sibhat Gebre-Egziabher", famous: "ትኩሳት", image: "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Sibhat_Gebre" },
    { name: "ምህረት ደበበ", latin: "Mihret Debebe", famous: "የተቆለፈበት ቁልፍ", image: "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Mihret_Debebe" },
    { name: "አዳም ረታ", latin: "Adam Reta", famous: "ግራጫ ቃጭሎች", image: "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Adam_Reta" },
    { name: "ዳንኤል ክብረት", latin: "Daniel Kibret", famous: "አራቱ ሀያላት", image: "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Daniel_Kibret" },
];

export default function Home() {
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
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

    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";

    useEffect(() => {
        getBooks()
            .then((res) => setBooks(res.data))
            .catch(() => setError("Failed to load books. Is the backend running?"))
            .finally(() => setLoading(false));
    }, []);

    const filteredBooks = query ?
        books.filter(
            (b) =>
            b.title.toLowerCase().includes(query.toLowerCase()) ||
            b.author.toLowerCase().includes(query.toLowerCase()) ||
            b.category.toLowerCase().includes(query.toLowerCase())
        ) :
        books;

    // 👇 Home shows only the FIRST 8 books (latest)
    const featuredBooks = filteredBooks.slice(0, 8);
    const hasMoreBooks = filteredBooks.length > 8;

    if (loading)
        return ( <
            p style = {
                { padding: "2rem", color: "white", textAlign: "center" } } >
            Loading books... <
            /p>
        );
    if (error)
        return ( <
            p style = {
                { padding: "2rem", color: "#ffcccc", textAlign: "center" } } > { error } <
            /p>
        );

    return ( <
        div > { /* HERO */ } {
            !query && ( <
                div style = {
                    {
                        background: darkMode ?
                            "linear-gradient(135deg, #0a0a14 0%, #3d2914 100%)" :
                            "linear-gradient(135deg, #1a1a2e 0%, #f4a261 100%)",
                        color: "white",
                        padding: "5rem 3rem",
                        textAlign: "center",
                        transition: "background 0.4s ease",
                    }
                } >
                <
                h1 style = {
                    {
                        fontSize: "3rem",
                        marginBottom: "1rem",
                        fontWeight: "bold",
                        color: "white",
                        textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }
                } >
                Welcome to EthioBooks📚 <
                /h1> <
                p style = {
                    {
                        fontSize: "1.2rem",
                        opacity: 0.95,
                        maxWidth: "600px",
                        margin: "0 auto 2rem",
                        color: "white",
                    }
                } >
                Discover the finest Ethiopian literature— from timeless classics to modern masterpieces <
                /p> <
                a href = "#featured"
                style = {
                    {
                        display: "inline-block",
                        padding: "0.9rem 2.5rem",
                        background: "white",
                        color: "#1a1a2e",
                        textDecoration: "none",
                        borderRadius: "30px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    }
                } >
                Explore Books↓ <
                /a> <
                /div>
            )
        }

        { /* FAMOUS AUTHORS */ } {
            !query && ( <
                section style = {
                    { padding: "3rem" } } >
                <
                h2 style = {
                    {
                        fontSize: "1.8rem",
                        marginBottom: "0.5rem",
                        textAlign: "center",
                        color: "white",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }
                } >
                ✍️Famous Ethiopian Authors <
                /h2> <
                p style = {
                    {
                        textAlign: "center",
                        color: "white",
                        opacity: 0.9,
                        marginBottom: "2.5rem",
                    }
                } >
                Meet the masters who shaped Ethiopian literature <
                /p>

                <
                div style = {
                    {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "2rem",
                        maxWidth: "1100px",
                        margin: "0 auto",
                    }
                } >
                {
                    FAMOUS_AUTHORS.map((author) => ( <
                        Link key = { author.latin }
                        to = { `/?q=${encodeURIComponent(author.name)}` }
                        style = {
                            { textDecoration: "none", color: "inherit" } } >
                        <
                        div style = {
                            {
                                textAlign: "center",
                                padding: "1rem",
                                borderRadius: "12px",
                                background: darkMode ? "#1a1a2e" : "white",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                            }
                        }
                        onMouseEnter = {
                            (e) => {
                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.boxShadow =
                                    "0 12px 24px rgba(0,0,0,0.25)";
                            }
                        }
                        onMouseLeave = {
                            (e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 4px 15px rgba(0,0,0,0.15)";
                            }
                        } >
                        <
                        img src = { author.image }
                        alt = { author.name }
                        onError = {
                            (e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/150x150/1a1a2e/ffffff?text=${encodeURIComponent(
                        author.latin
                      )}`;
                            }
                        }
                        style = {
                            {
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginBottom: "0.8rem",
                                border: "3px solid #FCDD09",
                            }
                        }
                        /> <
                        h3 style = {
                            {
                                fontSize: "1rem",
                                margin: "0 0 0.3rem",
                                color: darkMode ? "white" : "#1a1a2e",
                            }
                        } >
                        { author.name } <
                        /h3> <
                        p style = {
                            {
                                fontSize: "0.8rem",
                                color: darkMode ? "#aaa" : "#999",
                                margin: 0,
                            }
                        } >
                        { author.latin } <
                        /p> <
                        p style = {
                            {
                                fontSize: "0.75rem",
                                color: "#f4a261",
                                margin: "0.4rem 0 0",
                                fontStyle: "italic",
                            }
                        } >
                        "{author.famous}" <
                        /p> <
                        /div> <
                        /Link>
                    ))
                } <
                /div> <
                /section>
            )
        }

        { /* FEATURED BOOKS (Home shows only 8) */ } <
        section style = {
            { padding: "3rem" } }
        id = "featured" >
        <
        div style = {
            {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "1rem",
            }
        } >
        <
        h2 style = {
            {
                fontSize: "1.8rem",
                color: "white",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                margin: 0,
            }
        } >
        { query ? `Search results for "${query}"` : "⭐ Featured Books" } <
        /h2>

        { /* "See all" link — only show when not searching and more books exist */ } {
            !query && hasMoreBooks && ( <
                Link to = "/new"
                style = {
                    {
                        padding: "0.6rem 1.5rem",
                        background: "white",
                        color: "#1a1a2e",
                        borderRadius: "25px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }
                } >
                See all { filteredBooks.length }
                books→ <
                /Link>
            )
        } <
        /div>

        {
            featuredBooks.length === 0 ? ( <
                p style = {
                    { color: "white" } } > No books found. < /p>
            ) : ( <
                div style = {
                    {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                        gap: "2rem",
                    }
                } >
                {
                    featuredBooks.map((book) => ( <
                        BookCard key = { book._id }
                        book = { book }
                        />
                    ))
                } <
                /div>
            )
        }

        { /* Bottom CTA to see all books */ } {
            !query && hasMoreBooks && ( <
                div style = {
                    { textAlign: "center", marginTop: "3rem" } } >
                <
                Link to = "/new"
                style = {
                    {
                        display: "inline-block",
                        padding: "1rem 2.5rem",
                        background: "linear-gradient(135deg, #1a1a2e 0%, #f4a261 100%)",
                        color: "white",
                        borderRadius: "30px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                    }
                } >
                📚Browse All { filteredBooks.length }
                Books <
                /Link> <
                /div>
            )
        } <
        /section> <
        /div>
    );
}