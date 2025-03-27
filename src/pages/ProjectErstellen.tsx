import { useState } from "react";
import axios from "axios";
import styles from "../styles/ProjektErstellen.module.css"; // Dein CSS-Design
import { useNavigate } from "react-router-dom";
import SkillLevelDropdown from "../component/SkillLevelDropdown.tsx";
import { getToken } from "../utils/auth.ts"; // Auth-Token holen

const ProjektErstellen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        firmaName: "",
        startDatum: "",
        endDatum: "",
        status: "OPEN",
        skillLevel: "INTERMEDIATE", // Standardwert für Skill Level
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const token = getToken(); // Auth-Token abrufen
            await axios.post("http://localhost:3000/projects/create", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Projekt erfolgreich erstellt!");
            navigate("/projects"); // Weiterleitung zur Projektübersicht
        } catch (error) {
            setError("Fehler beim Erstellen des Projekts. Bitte überprüfe die Eingaben. " + error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Neues Projekt erstellen</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Projektname:</label>
                    <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Gib den Namen des Projekts ein"
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Beschreibung:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Kurze Beschreibung des Projekts"
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Firma:</label>
                    <input
                        type="text"
                        name="firmaName"
                        value={formData.firmaName}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Name der Firma"
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Startdatum:</label>
                    <input
                        type="date"
                        name="startDatum"
                        value={formData.startDatum}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Enddatum:</label>
                    <input
                        type="date"
                        name="endDatum"
                        value={formData.endDatum}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="OPEN">Offen</option>
                        <option value="CLOSED">Geschlossen</option>
                    </select>
                </div>

                {/* Skill Level Dropdown */}
                <SkillLevelDropdown value={formData.skillLevel} onChange={handleChange} />

                <button type="submit" className={styles.button}>Projekt erstellen</button>
            </form>
        </div>
    );
};

export default ProjektErstellen;
