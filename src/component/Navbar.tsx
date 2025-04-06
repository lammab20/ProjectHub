import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { useAuth } from "../context/AuthContext";
import {isAuthenticated, logout} from "../utils/auth.ts";

const Navbar = () => {
    const navigate = useNavigate();
    const { isUserAdmin } = useAuth();

    // Logout-Funktion: Token entfernen
    const handleLogout = () => {
        logout();
        navigate("/login"); // Nach dem Logout zur Login-Seite navigieren
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <a href="/" className={styles.logo}>Project Hub</a>
                <ul className={styles.navLinks}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/projects">Projects</a></li>

                    {!isAuthenticated() && (
                        <li><a href="/login">Login</a></li>
                    )}

                    {isAuthenticated() && (
                        <li>
                            <a onClick={handleLogout}>
                                Logout
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
