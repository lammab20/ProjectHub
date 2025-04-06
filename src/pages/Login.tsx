import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {getUserRole, login} from "../utils/auth.ts";
import {IMessage} from "../models/IMessage.ts";
import WSHandler from "../utils/ws/WSHandler.ts";


const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const {setIsUserAdmin} = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("hallo vorm try")

        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password
            });

            const { token, user, role } = response.data;

            if(role === "ADMIN"){
                setIsUserAdmin(true)
            }

            // Speichern des Tokens (z. B. in localStorage)
            login(token);
            console.log("Role zum übergeben: ", role)

            const msg: IMessage = {
                type: "LOGIN",
                payload: {
                    email: email,
                    role: "ADMIN"
                }
            };
            WSHandler.sendMessage(msg);

            // Weiterleitung oder Benachrichtigung
            console.log("Login erfolgreich:", user);
            // Hier könntest du den User z.B. zur Dashboard-Seite weiterleiten
            navigate("/Projects")
            window.location.reload();
        } catch (err) {
            setError("Invalid credentials"+err);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.title}>Login</h2>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
