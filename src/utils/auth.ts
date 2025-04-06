import {jwtDecode} from "jwt-decode";
import {IDecodedToken} from "../models/IDecodedToken.ts";

export const isAuthenticated = (): boolean => {
    const token = getToken();
    if (!token) return false;

    // Optional: Token-Überprüfung, z.B. Ablaufdatum checken
    try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const expiration = decoded.exp;
        if (expiration < Date.now() / 100000) return false; // token expired
    } catch (error) {
        console.error("Fehler beim Dekodieren des Tokens:", error);
        return false;
    }

    return true;
};

export const login = (token: string) => {
    const tabId = sessionStorage.getItem("tabId") || crypto.randomUUID();
    sessionStorage.setItem("tabId", tabId);
    localStorage.setItem(`token_${tabId}`, token);
};

export const logout = () => {
    const tabId = sessionStorage.getItem("tabId");
    if (tabId) {
        localStorage.removeItem(`token_${tabId}`);
    }
    window.location.href = "/";
};

export function getToken(): string | null {
    const tabId = sessionStorage.getItem("tabId");
    return tabId ? localStorage.getItem(`token_${tabId}`) : null;
}


export function getUserRole(): "ADMIN" | "USER" | null {
    const token = getToken(); // Token aus dem LocalStorage holen

    if (!token) return null; // Falls kein Token vorhanden ist

    try {
        const decoded: IDecodedToken = jwtDecode(token); // JWT dekodieren
        return decoded.role;
    } catch (error) {
        console.error("Fehler beim Dekodieren des Tokens:", error);
        return null;
    }
}

