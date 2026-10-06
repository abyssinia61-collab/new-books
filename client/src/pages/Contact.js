import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) =>
        setForm({...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", form);
        setSent(true);
        setForm({ name: "", email: "", message: "" });
    };

    const field = {
        display: "block",
        width: "100%",
        padding: "0.8rem 1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
        fontFamily: "inherit",
        boxSizing: "border-box",
        outline: "none",
    };

    const contactCards = [{
            icon: "📧",
            title: "Email",
            value: "abyssinia61@gmail.com",
            link: "mailto:abyssinia61@gmail.com",
        },
        {
            icon: "📞",
            title: "Phone",
            value: "+251 99 662 6940",
            link: "tel:+251996626940",
        },
        {
            icon: "📍",
            title: "Location",
            value: "Addis Ababa, Ethiopia",
            link: null,
        },
    ];

    return ( <
        div style = {
            { padding: "3rem 2rem", fontFamily: "Georgia, serif" } } > { /* HERO */ } <
        div style = {
            {
                textAlign: "center",
                color: "white",
                padding: "3rem 1rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }
        } >
        <
        h1 style = {
            { fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" } } > 📬Contact Us <
        /h1> <
        p style = {
            { fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", opacity: 0.95 } } >
        Have a question ? Want to suggest a book ? We 'd love to hear from you. <
        /p> <
        /div>

        { /* CONTACT INFO CARDS */ } <
        div style = {
            {
                maxWidth: "1000px",
                margin: "0 auto 3rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
            }
        } >
        {
            contactCards.map((c) => {
                const CardContent = ( <
                    div style = {
                        {
                            background: "rgba(255, 255, 255, 0.95)",
                            borderRadius: "12px",
                            padding: "2rem",
                            textAlign: "center",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                            transition: "all 0.25s ease",
                            cursor: c.link ? "pointer" : "default",
                            height: "100%",
                        }
                    }
                    onMouseEnter = {
                        (e) => {
                            if (c.link) {
                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.25)";
                            }
                        }
                    }
                    onMouseLeave = {
                        (e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                        }
                    } >
                    <
                    div style = {
                        { fontSize: "2.5rem", marginBottom: "0.5rem" } } > { c.icon } < /div> <
                    h3 style = {
                        {
                            color: "#1a1a2e",
                            marginBottom: "0.5rem",
                            fontSize: "1.1rem",
                        }
                    } >
                    { c.title } <
                    /h3> <
                    p style = {
                        {
                            color: "#666",
                            margin: 0,
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            wordBreak: "break-word",
                        }
                    } >
                    { c.value } <
                    /p> <
                    /div>
                );

                return c.link ? ( <
                    a key = { c.title }
                    href = { c.link }
                    style = {
                        { textDecoration: "none", color: "inherit" } } >
                    { CardContent } <
                    /a>
                ) : ( <
                    div key = { c.title } > { CardContent } < /div>
                );
            })
        } <
        /div>

        { /* FORM */ } <
        div style = {
            {
                maxWidth: "650px",
                margin: "0 auto",
                background: "rgba(255, 255, 255, 0.98)",
                borderRadius: "16px",
                padding: "3rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }
        } >
        {
            sent ? ( <
                div style = {
                    { textAlign: "center", padding: "2rem 0" } } >
                <
                div style = {
                    { fontSize: "4rem", marginBottom: "1rem" } } > ✅ < /div> <
                h2 style = {
                    { color: "#078930", marginBottom: "0.5rem" } } > Thank you! < /h2> <
                p style = {
                    { color: "#666", marginBottom: "1.5rem" } } >
                Your message has been received.We 'll get back to you at{" "} <
                b > abyssinia61 @gmail.com < /b>. <
                /p> <
                button onClick = {
                    () => setSent(false) }
                style = {
                    {
                        padding: "0.7rem 1.8rem",
                        background: "#1a1a2e",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                    }
                } >
                Send Another <
                /button> <
                /div>
            ) : ( <
                >
                <
                h2 style = {
                    {
                        color: "#1a1a2e",
                        marginBottom: "1.5rem",
                        textAlign: "center",
                    }
                } >
                Send us a message <
                /h2>

                <
                form onSubmit = { handleSubmit } >
                <
                input style = { field }
                name = "name"
                placeholder = "Your name"
                value = { form.name }
                onChange = { handleChange }
                required /
                >
                <
                input style = { field }
                name = "email"
                type = "email"
                placeholder = "Your email"
                value = { form.email }
                onChange = { handleChange }
                required /
                >
                <
                textarea style = {
                    {...field, minHeight: "140px", resize: "vertical" } }
                name = "message"
                placeholder = "Your message..."
                value = { form.message }
                onChange = { handleChange }
                required /
                >
                <
                button type = "submit"
                style = {
                    {
                        width: "100%",
                        padding: "0.9rem",
                        background: "linear-gradient(135deg, #1a1a2e 0%, #f4a261 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        letterSpacing: "1px",
                    }
                } >
                Send Message→ <
                /button> <
                /form> <
                />
            )
        } <
        /div> <
        /div>
    );
}