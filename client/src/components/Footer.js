export default function Footer() {
    return ( <
        footer style = {
            {
                background: "linear-gradient(135deg, #1a1a2e 0%, #f4a261 100%)",
                color: "white",
                padding: "3rem 2rem 1.5rem",
                marginTop: "4rem",
                fontFamily: "Georgia, serif",
            }
        } >
        <
        div style = {
            {
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "2rem",
                maxWidth: "1200px",
                margin: "0 auto",
            }
        } >
        { /* BRAND */ } <
        div style = {
            { minWidth: "220px", flex: 1 } } >
        <
        h3 style = {
            {
                color: "white",
                marginBottom: "0.8rem",
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }
        } >
        <
        span style = {
            {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #078930, #FCDD09, #DA121A)",
                borderRadius: "8px",
                fontSize: "1.2rem",
            }
        } >
        📚
        <
        /span>
        Ethio < span style = {
            { color: "#FCDD09" } } > Books < /span> <
        /h3> <
        p style = {
            { opacity: 0.85, maxWidth: "300px", lineHeight: 1.6, margin: 0 } } >
        Your home
        for Ethiopian literature and culture.Discover timeless classics and modern masterpieces. <
        /p> <
        /div>

        { /* QUICK LINKS */ } <
        div style = {
            { minWidth: "150px" } } >
        <
        h4 style = {
            {
                marginBottom: "1rem",
                color: "#FCDD09",
                fontSize: "0.95rem",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
            }
        } >
        Quick Links <
        /h4> <
        ul style = {
            { listStyle: "none", padding: 0, margin: 0, lineHeight: 2 } } >
        <
        li > < a href = "/"
        style = { linkStyle } > Home < /a></li >
        <
        li > < a href = "/new"
        style = { linkStyle } > New Books < /a></li >
        <
        li > < a href = "/authors"
        style = { linkStyle } > Authors < /a></li >
        <
        li > < a href = "/about"
        style = { linkStyle } > About Us < /a></li >
        <
        /ul> <
        /div>

        { /* CATEGORIES */ } <
        div style = {
            { minWidth: "150px" } } >
        <
        h4 style = {
            {
                marginBottom: "1rem",
                color: "#FCDD09",
                fontSize: "0.95rem",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
            }
        } >
        Categories <
        /h4> <
        ul style = {
            { listStyle: "none", padding: 0, margin: 0, lineHeight: 2 } } >
        <
        li > < a href = "/?q=Fiction"
        style = { linkStyle } > Fiction < /a></li >
        <
        li > < a href = "/?q=Poetry"
        style = { linkStyle } > Poetry < /a></li >
        <
        li > < a href = "/?q=History"
        style = { linkStyle } > History < /a></li >
        <
        li > < a href = "/?q=Biography"
        style = { linkStyle } > Biography < /a></li >
        <
        /ul> <
        /div>

        { /* CONTACT — UPDATED */ } <
        div style = {
            { minWidth: "220px" } } >
        <
        h4 style = {
            {
                marginBottom: "1rem",
                color: "#FCDD09",
                fontSize: "0.95rem",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
            }
        } >
        Contact <
        /h4>

        <
        a href = "mailto:abyssinia61@gmail.com"
        style = { contactStyle }
        onMouseEnter = {
            (e) => (e.currentTarget.style.opacity = "1") }
        onMouseLeave = {
            (e) => (e.currentTarget.style.opacity = "0.85") } >
        📧abyssinia61 @gmail.com <
        /a>

        <
        a href = "tel:+251996626940"
        style = { contactStyle }
        onMouseEnter = {
            (e) => (e.currentTarget.style.opacity = "1") }
        onMouseLeave = {
            (e) => (e.currentTarget.style.opacity = "0.85") } >
        📞+251 99 662 6940 <
        /a>

        <
        p style = {
            { opacity: 0.85, margin: 0 } } > 📍Addis Ababa, Ethiopia <
        /p> <
        /div> <
        /div>

        { /* BOTTOM BAR */ } <
        div style = {
            {
                borderTop: "1px solid rgba(255,255,255,0.2)",
                marginTop: "2.5rem",
                paddingTop: "1.2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                maxWidth: "1200px",
                margin: "2.5rem auto 0",
            }
        } >
        <
        p style = {
            { margin: 0, opacity: 0.75, fontSize: "0.9rem" } } > ©2026 EthioBooks.All rights reserved. <
        /p> <
        p style = {
            { margin: 0, opacity: 0.75, fontSize: "0.9rem" } } >
        Made with❤️ in Ethiopia <
        /p> <
        /div> <
        /footer>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    opacity: 0.85,
    fontSize: "0.9rem",
    transition: "opacity 0.2s, color 0.2s",
};

const contactStyle = {
    color: "white",
    textDecoration: "none",
    opacity: 0.85,
    margin: "0 0 0.5rem",
    display: "block",
    fontSize: "0.9rem",
    transition: "opacity 0.2s",
    wordBreak: "break-all",
};