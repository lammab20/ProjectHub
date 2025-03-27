import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgMore } from "react-icons/cg";
import axios from "axios";
import styles from '../styles/Project.module.css';
import { IProject } from "../models/IProject.ts"; // Importiere IProject für den Typ
import { useNavigate } from 'react-router-dom';
import {getToken} from "../utils/auth.ts";

const AllProjects = () => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<IProject | null>(null); // Zustand für ausgewähltes Projekt
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Zustand für Popup

    const navigate = useNavigate(); // Für Navigation, falls benötigt

    useEffect(() => {
        // API-Aufruf mit axios, um die Projekte abzurufen
        axios.get('http://localhost:3000/projects/allProjects', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`, // Token aus localStorage
            },
        })
            .then((response) => {
                setProjects(response.data); // Setze die Projekte in den State
                setLoading(false); // Ladeanzeige ausblenden
            })
            .catch((err) => {
                setError('Not Authorized please login');
                setLoading(false); // Ladeanzeige ausblenden
            });
    }, []);

    // Wenn das Popup geschlossen wird
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProject(null); // Leere das ausgewählte Projekt
    };

    // Like-Button Logik
    const handleLike = () => {
        alert("Projekt geliked!"); // Hier kannst du eine Logik für den Like-Button einbauen
    };

    // Wenn das Popup geöffnet werden soll
    const openPopup = (project: IProject) => {
        setSelectedProject(project); // Setze das ausgewählte Projekt
        setIsPopupOpen(true); // Zeige das Popup an
    };

    // Ladeanzeige
    if (loading) {
        return <div className={styles.loading}><AiOutlineLoading3Quarters /></div>;
    }

    // Fehleranzeige
    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.projectContainer}>
            <h1 className={styles.title}>Alle Projekte</h1>
            <div className={styles.projectsList}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.projectCard}>
                        <h2 className={styles.projectName}>{project.projectName}</h2>
                        <p className={styles.projectFirma}>Firma: {project.firmaName}</p>

                        <button className={styles.button} onClick={() => openPopup(project)}>
                            <CgMore />
                        </button>
                    </div>
                ))}
            </div>

            {/* Das Popup mit den Projektdetails */}
            {isPopupOpen && selectedProject && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                        <h2 className={styles.popupTitle}>{selectedProject.projectName}</h2>
                        <p><strong>Firma:</strong> {selectedProject.firmaName}</p>
                        <p><strong>Beschreibung:</strong> {selectedProject.description}</p>
                        <p><strong>Startdatum:</strong> {new Date(selectedProject.startDatum).toLocaleDateString()}</p>
                        <p><strong>Enddatum:</strong> {new Date(selectedProject.endDatum).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {selectedProject.status}</p>
                        <p><strong>Skill Level:</strong> {selectedProject.skillLevel}</p>

                        <div className={styles.popupButtons}>
                            <button className={styles.closeButton} onClick={closePopup}>
                                Schließen
                            </button>
                            <button className={styles.likeButton} onClick={handleLike}>
                                Like
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProjects;
