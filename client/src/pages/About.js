import { Link } from "react-router-dom";

export default function About() {
    return ( <
        div style = {
            { padding: "3rem 2rem", fontFamily: "Georgia, serif" } } > { /* HERO */ } <
        div style = {
            {
                textAlign: "center",
                color: "white",
                padding: "3rem 1rem 4rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }
        } >
        <
        h1 style = {
            { fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" } } >
        About EthioBooks <
        /h1> <
        p style = {
            { fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.95 } } >
        Bringing the richness of Ethiopian literature to readers around the world🇪🇹 <
        /p> <
        /div>

        { /* MISSION */ } <
        div style = {
            {
                maxWidth: "900px",
                margin: "0 auto 3rem",
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                padding: "3rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }
        } >
        <
        h2 style = {
            {
                fontSize: "1.8rem",
                color: "#1a1a2e",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
            }
        } >
        🎯Our Mission <
        /h2> <
        p style = {
            { fontSize: "1.05rem", lineHeight: 1.8, color: "#444", marginBottom: "1rem" } } >
        Welcome to < b style = {
            { color: "#DA121A" } } > EthioBooks < /b> — your home for
        Ethiopian literature and culture.We curate the finest books from Ethiopian and Ethiopian - diaspora authors, bringing stories of history, resilience, and beauty to readers around the world. <
        /p> <
        p style = {
            { fontSize: "1.05rem", lineHeight: 1.8, color: "#444", margin: 0 } } >
        Our mission is to make African literature accessible— whether you 're a
        lifelong reader or discovering your first Ethiopian novel. <
        /p> <
        /div>

        { /* WHAT WE OFFER */ } <
        div style = {
            {
                maxWidth: "900px",
                margin: "0 auto 3rem",
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                padding: "3rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }
        } >
        <
        h2 style = {
            {
                fontSize: "1.8rem",
                color: "#1a1a2e",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
            }
        } >
        📚What We Offer <
        /h2> <
        div style = {
            {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
            }
        } >
        {
            [
                { icon: "📚", title: "Curated Collection", desc: "Handpicked Ethiopian classics and modern works" },
                { icon: "✍️", title: "Featured Authors", desc: "Discover works by Ethiopia's greatest writers" },
                { icon: "🔍", title: "Easy Search", desc: "Find books by title, author, or category" },
                { icon: "❤️", title: "Made with Love", desc: "A passion project celebrating Ethiopian culture" },
            ].map((item) => ( <
                div key = { item.title }
                style = {
                    {
                        padding: "1.5rem",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                        border: "1px solid #eee",
                        transition: "all 0.3s ease",
                        cursor: "default",
                    }
                }
                onMouseEnter = {
                    (e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
                        e.currentTarget.style.borderColor = "#FCDD09";
                    }
                }
                onMouseLeave = {
                    (e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#eee";
                    }
                } >
                <
                div style = {
                    { fontSize: "2.5rem", marginBottom: "0.5rem" } } > { item.icon } < /div> <
                h3 style = {
                    { fontSize: "1.1rem", color: "#1a1a2e", marginBottom: "0.4rem" } } > { item.title } <
                /h3> <
                p style = {
                    { color: "#666", fontSize: "0.95rem", margin: 0, lineHeight: 1.6 } } > { item.desc } <
                /p> <
                /div>
            ))
        } <
        /div> <
        /div>

        { /* STATS */ } <
        div style = {
            {
                maxWidth: "900px",
                margin: "0 auto 3rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1.5rem",
            }
        } >
        {
            [
                { number: "50+", label: "Amharic Books" },
                { number: "20+", label: "Authors" },
                { number: "5", label: "Categories" },
                { number: "100%", label: "Ethiopian 🇪🇹" },
            ].map((stat) => ( <
                div key = { stat.label }
                style = {
                    {
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        textAlign: "center",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    }
                } >
                <
                div style = {
                    {
                        fontSize: "2.2rem",
                        fontWeight: "bold",
                        color: "#DA121A",
                        marginBottom: "0.3rem",
                    }
                } >
                { stat.number } <
                /div> <
                div style = {
                    { color: "#666", fontSize: "0.9rem" } } > { stat.label } < /div> <
                /div>
            ))
        } <
        /div>

        { /* CTA */ } <
        div style = {
            { textAlign: "center", padding: "3rem 1rem", color: "white" } } >
        <
        h2 style = {
            { fontSize: "2rem", marginBottom: "1rem", textShadow: "0 2px 8px rgba(0,0,0,0.3)" } } >
        Ready to explore ?
        <
        /h2> <
        Link to = "/"
        style = {
            {
                display: "inline-block",
                padding: "1rem 2.5rem",
                background: "white",
                color: "#1a1a2e",
                textDecoration: "none",
                borderRadius: "30px",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            }
        } >
        Browse Collection→ <
        /Link> <
        /div>

        { /* GET IN TOUCH — UPDATED */ } <
        div style = {
            {
                maxWidth: "900px",
                margin: "0 auto",
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                padding: "3rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                textAlign: "center",
            }
        } >
        <
        h2 style = {
            { fontSize: "1.8rem", color: "#1a1a2e", marginBottom: "1rem" } } > 📬Get in Touch <
        /h2> <
        div style = {
            { marginBottom: "1.5rem" } } >
        <
        p style = {
            { color: "#444", fontSize: "1.05rem", marginBottom: "0.5rem" } } >
        <
        b > Email : < /b>{" "} <
        a href = "mailto:abyssinia61@gmail.com"
        style = {
            { color: "#DA121A", textDecoration: "none", fontWeight: "600" } } >
        abyssinia61 @gmail.com <
        /a> <
        /p> <
        p style = {
            { color: "#444", fontSize: "1.05rem", marginBottom: "0.5rem" } } >
        <
        b > Phone: < /b>{" "} <
        a href = "tel:+251996626940"
        style = {
            { color: "#DA121A", textDecoration: "none", fontWeight: "600" } } >
        +251 99 662 6940 <
        /a> <
        /p> <
        p style = {
            { color: "#444", fontSize: "1.05rem", margin: 0 } } >
        <
        b > Address: < /b> Addis Ababa, Ethiopia 🇪🇹 <
        /p> <
        /div>

        <
        div style = {
            {
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
            }
        } >
        <
        a href = "mailto:abyssinia61@gmail.com"
        style = { btnStyle } > ✉️Email Us <
        /a> <
        Link to = "/"
        style = { btnStyleDark } > 📚Shop Now <
        /Link> <
        /div> <
        /div> <
        /div>
    );
}

const btnStyle = {
    padding: "0.7rem 1.8rem",
    background: "#FCDD09",
    color: "#1a1a2e",
    textDecoration: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    fontSize: "0.95rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

const btnStyleDark = {
    padding: "0.7rem 1.8rem",
    background: "#1a1a2e",
    color: "white",
    textDecoration: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    fontSize: "0.95rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};