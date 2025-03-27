import './App.css'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import Login from "./pages/Login.tsx";
import {isAuthenticated} from "./utils/auth.ts";
import Projects from "./pages/Projects.tsx";
import Navbar from "./component/Navbar.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Home from "./pages/Home.tsx";
import ProjectErstellen from "./pages/ProjectErstellen.tsx";

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                    <Navbar/>
                <Routes>
                    {/* Login-Route immer verfügbar */}
                    <Route path="/login" element={<Login />} />

                    {/* Authentifizierte Routen */}
                    {isAuthenticated() ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/create" element={<ProjectErstellen />} />
                        </>
                    ) : (
                        // Falls nicht eingeloggt, zur Login-Seite weiterleiten
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    )}
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App
