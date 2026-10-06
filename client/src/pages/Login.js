import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, googleLogin } from "../api";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";


export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form);
            login(res.data.user, res.data.token);
            navigate("/");
        } catch (err) {
            let message = "Login failed";
            if (err && err.response && err.response.data && err.response.data.error) {
                message = err.response.data.error;
            }
            setError(message);
        }
    };

    const field = {
        display: "block",
        width: "100%",
        padding: "0.9rem 1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
        boxSizing: "border-box",
    };

    return ( <
        div style = {
            { padding: "3rem 2rem", display: "flex", justifyContent: "center" }
        } >
        <
        div style = {
            {
                background: "white",
                borderRadius: "16px",
                padding: "3rem",
                maxWidth: "450px",
                width: "100%",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }
        } >
        <
        h1 style = {
            { textAlign: "center", marginBottom: "0.5rem", color: "#1a1a2e" }
        } >
        Welcome Back <
        /h1> <
        p style = {
            { textAlign: "center", color: "#888", marginBottom: "2rem" }
        } >
        Log in to your account <
        /p>

        {
            error && ( <
                p style = {
                    {
                        background: "#ffebee",
                        color: "#c62828",
                        padding: "0.8rem",
                        borderRadius: "8px",
                        marginBottom: "1rem",
                    }
                } > { error } <
                /p>
            )
        }

        <
        form onSubmit = { handleSubmit } >
        <
        input style = { field }
        name = "email"
        type = "email"
        placeholder = "Email address"
        value = { form.email }
        onChange = { handleChange }
        required /
        >
        <
        input style = { field }
        name = "password"
        type = "password"
        placeholder = "Password"
        value = { form.password }
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
            }
        } >
        Log In→ <
        /button> < /
        form >
        <
        div style = {
            { marginTop: "1.5rem", textAlign: "center" } } >
        <
        p style = {
            { color: "#999", fontSize: "0.85rem", margin: "1rem 0" } } > ───OR─── <
        /p> <
        GoogleLogin onSuccess = {
            async(credentialResponse) => {
                try {
                    const res = await googleLogin(credentialResponse.credential);
                    login(res.data.user, res.data.token);
                    navigate("/");
                } catch (err) {
                    setError("Google login failed");
                }
            }
        }
        onError = {
            () => setError("Google login failed") }
        text = "signin_with"
        width = "350" /
        >
        <
        /div> <
        p style = {
            { textAlign: "center", marginTop: "1.5rem", color: "#666" }
        } >
        New here ? { " " } <
        Link to = "/signup"
        style = {
            { color: "#f4a261", fontWeight: "bold" }
        } >
        Create an account <
        /Link> < /
        p > <
        /div> < /
        div >
    );
}