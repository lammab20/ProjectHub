import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { getUserRole } from "../utils/auth"; // 🔹 Funktion importieren

const Home = () => {
    const navigate = useNavigate();
    const role = getUserRole(); // 🔹 Rolle aus JWT-Token holen

    return (
        <div className={styles.homeContainer}>
            <div className={styles.welcomeSection}>
                <h1 className={styles.welcomeTitle}>Willkommen bei unserer Projektverwaltung</h1>
            </div>

            <div className={styles.actionButtons}>
                <button className={styles.actionButton} onClick={() => navigate("/projects")}>
                    <AiOutlineAppstoreAdd className={styles.icon} />
                    Projekte anzeigen
                </button>

                {/* 🔹 Button nur für Admins sichtbar */}
                {role === "ADMIN" && (
                    <button className={styles.actionButton} onClick={() => navigate("/create")}>
                        <AiOutlineAppstoreAdd className={styles.icon}/>
                        Neues Projekt hinzufügen
                    </button>
                )}
                {role === "ADMIN" && (
                    <button className={styles.actionButton} onClick={() => navigate("/loggedInUser")}>
                        <AiOutlineAppstoreAdd className={styles.icon}/>
                        Eingeloggte Benutzer anzeigen
                    </button>
                )}
            </div>

            <div className={styles.featuresSection}>
                <h2 className={styles.featuresTitle}>HTBLA Kaindorf project hub</h2>
                <div className={styles.featureItem}>
                    <h3>Wer sucht findet ;)</h3>
                    <p>
                        Wenn du auf der Suche bist nach einem Projekt für Syp oder deine Diplomarbeit, schau dich gerne
                        auf unserer Website um.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
