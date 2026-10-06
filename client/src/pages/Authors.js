import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../api";

const AUTHOR_IMAGES = {
    // ---- Original 6 authors ----
    "በዓሉ ግርማ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Bealu_Girma",
    "ሀዲስ ዓለማየሁ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Hadis_Alemayehu",
    "ስብሐት ገብረ እግዚአብሔር": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Sibhat_Gebre",
    "ምህረት ደበበ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Mihret_Debebe",
    "አዳም ረታ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Adam_Reta",
    "ዳንኤል ክብረት": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/Daniel_Kibret",

    // ---- 🆕 Additional 12 authors ----
    "ሲሳይ ንጉሱ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ሲሳይ_ንጉሱ",
    "በዕውቀቱ ስዩም": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/በዕውቀቱ_ስዩም",
    "ተስፋዬ ገብረአብ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ተስፋዬ_ገብረአብ",
    "አቤ ጉበኛ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/አቤ_ጉበኛ",
    "ዓለማየሁ ዋሴ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ዓለማየሁ_ዋሴ",
    "ዓለማየሁ ገላጋይ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ዓለማየሁ_ገላጋይ",
    "ዘነበ ወላ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ዘነበ_ወላ",
    "ዘውዴ ረታ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ዘውዴ_ረታ",
    "ይስማዕከ ወርቁ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ይስማዕከ_ወርቁ",
    "ዳኛቸው ወርቁ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ዳኛቸው_ወርቁ",
    "ፀጋዬ ገብረ መድኅን": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ፀጋዬ_ገብረ_መድኅን",
    "ፍሥሐ ደስታ": "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto/ፍሥሐ_ደስታ",
};

export default function Authors() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBooks()
            .then((res) => setBooks(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return ( <
            p style = {
                { padding: "3rem", color: "white", fontSize: "1.2rem" } } >
            Loading authors... <
            /p>
        );
    }

    const groupedAuthors = books.reduce((acc, book) => {
        if (!acc[book.author]) acc[book.author] = [];
        acc[book.author].push(book);
        return acc;
    }, {});

    const authors = Object.entries(groupedAuthors).sort((a, b) =>
        a[0].localeCompare(b[0])
    );

    return ( <
        div style = {
            { padding: "3rem 2rem" } } > { /* HEADER */ } <
        div style = {
            {
                textAlign: "center",
                color: "white",
                marginBottom: "3rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }
        } >
        <
        h1 style = {
            { fontSize: "3rem", marginBottom: "0.8rem", fontWeight: "bold" } } > ✍️Ethiopian Authors <
        /h1> <
        p style = {
            { fontSize: "1.2rem", opacity: 0.95 } } >
        Meet { authors.length }
        incredible voices shaping Ethiopian literature <
        /p> <
        /div>

        { /* GRID */ } <
        div style = {
            {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem",
                maxWidth: "1300px",
                margin: "0 auto",
            }
        } >
        {
            authors.map(([author, authorBooks]) => ( <
                div key = { author }
                style = {
                    {
                        background: "rgba(255, 255, 255, 0.98)",
                        borderRadius: "16px",
                        padding: "2rem",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                    }
                }
                onMouseEnter = {
                    (e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.25)";
                    }
                }
                onMouseLeave = {
                    (e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                    }
                } >
                { /* AUTHOR HEADER */ } <
                div style = {
                    {
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1.2rem",
                        paddingBottom: "1.2rem",
                        borderBottom: "2px solid #FCDD09",
                    }
                } >
                <
                AuthorAvatar author = { author }
                />

                <
                div >
                <
                h2 style = {
                    {
                        fontSize: "1.3rem",
                        color: "#1a1a2e",
                        margin: "0 0 0.2rem",
                        lineHeight: 1.2,
                    }
                } >
                { author } <
                /h2> <
                span style = {
                    {
                        fontSize: "0.85rem",
                        color: "#f4a261",
                        fontWeight: "bold",
                    }
                } >
                { authorBooks.length } { authorBooks.length === 1 ? "book" : "books" } <
                /span> <
                /div> <
                /div>

                { /* BOOK LIST */ } <
                div style = {
                    { flex: 1 } } > {
                    authorBooks.map((book) => ( <
                        Link key = { book._id }
                        to = { `/book/${book._id}` }
                        style = {
                            {
                                display: "flex",
                                alignItems: "center",
                                gap: "0.8rem",
                                padding: "0.7rem",
                                marginBottom: "0.5rem",
                                borderRadius: "8px",
                                textDecoration: "none",
                                color: "#333",
                                background: "#f8f9fa",
                            }
                        } >
                        <
                        img src = { book.coverImage }
                        alt = { book.title }
                        onError = {
                            (e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/60x80/1a1a2e/ffffff?text=Book`;
                            }
                        }
                        style = {
                            {
                                width: "40px",
                                height: "55px",
                                objectFit: "cover",
                                borderRadius: "4px",
                                flexShrink: 0,
                            }
                        }
                        /> <
                        div style = {
                            { flex: 1, minWidth: 0 } } >
                        <
                        div style = {
                            {
                                fontSize: "0.95rem",
                                fontWeight: "600",
                                color: "#1a1a2e",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }
                        } >
                        { book.title } <
                        /div> <
                        div style = {
                            {
                                fontSize: "0.8rem",
                                color: "#f4a261",
                                fontWeight: "bold",
                            }
                        } >
                        $ { book.price.toFixed(2) } <
                        /div> <
                        /div> <
                        /Link>
                    ))
                } <
                /div>

                { /* VIEW ALL */ } <
                Link to = { `/?q=${encodeURIComponent(author)}` }
                style = {
                    {
                        marginTop: "1rem",
                        display: "block",
                        textAlign: "center",
                        padding: "0.6rem",
                        background: "#1a1a2e",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                    }
                } >
                View All Books→ <
                /Link> <
                /div>
            ))
        } <
        /div> <
        /div>
    );
}

/* --------------------------------------------------
   AuthorAvatar — photo OR fallback initial circle
   -------------------------------------------------- */
function AuthorAvatar({ author }) {
    const [imageFailed, setImageFailed] = useState(false);
    const imageUrl = AUTHOR_IMAGES[author];
    const showFallback = !imageUrl || imageFailed;

    const colors = [
        "linear-gradient(135deg, #078930, #FCDD09)",
        "linear-gradient(135deg, #DA121A, #FCDD09)",
        "linear-gradient(135deg, #1a1a2e, #f4a261)",
        "linear-gradient(135deg, #078930, #1a1a2e)",
        "linear-gradient(135deg, #f4a261, #DA121A)",
    ];
    const colorIndex = author.charCodeAt(0) % colors.length;

    if (showFallback) {
        return ( <
            div style = {
                {
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    border: "3px solid #FCDD09",
                    background: colors[colorIndex],
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    flexShrink: 0,
                    fontFamily: "Georgia, serif",
                }
            } >
            { author.charAt(0) } <
            /div>
        );
    }

    return ( <
        img src = { imageUrl }
        alt = { author }
        onError = {
            () => setImageFailed(true) }
        style = {
            {
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #FCDD09",
                flexShrink: 0,
            }
        }
        />
    );
}