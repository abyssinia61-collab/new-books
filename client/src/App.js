import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import NewBooks from "./pages/NewBooks";
import Authors from "./pages/Authors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Community from "./pages/Community";

export default function App() {
    return ( <
        GoogleOAuthProvider clientId = { process.env.REACT_APP_GOOGLE_CLIENT_ID } >
        <
        AuthProvider >
        <
        BrowserRouter >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/book/:id"
        element = { < BookDetail / > }
        /> <
        Route path = "/add"
        element = { < AddBook / > }
        /> <
        Route path = "/new"
        element = { < NewBooks / > }
        /> <
        Route path = "/authors"
        element = { < Authors / > }
        /> <
        Route path = "/about"
        element = { < About / > }
        /> <
        Route path = "/contact"
        element = { < Contact / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/signup"
        element = { < Signup / > }
        />  <
        Route path = "/community"
        element = { < Community / > }
        />< /
        Routes > <
        Footer / >
        <
        /BrowserRouter> < /
        AuthProvider > <
        /GoogleOAuthProvider>
    );
}