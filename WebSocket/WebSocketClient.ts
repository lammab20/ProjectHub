const token = "DEIN_JWT_TOKEN_HIER";
const ws = new WebSocket(`ws://localhost:8080`);

ws.onopen = () => {
    console.log("WebSocket verbunden!");

    // Login senden
    ws.send(JSON.stringify({ type: "login", token }));

    // Danach eine Chat-Nachricht senden
    setTimeout(() => {
        ws.send(JSON.stringify({ type: "chat", text: "Hallo WebSocket!" }));
    }, 2000);
};

ws.onmessage = (event) => {
    console.log("Server antwortet:", event.data);
};

ws.onerror = (error) => {
    console.error("WebSocket-Fehler:", error);
};

ws.onclose = () => {
    console.log("WebSocket geschlossen");
};
