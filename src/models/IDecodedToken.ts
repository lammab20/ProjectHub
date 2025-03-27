export interface IDecodedToken {
    id: string;
    email: string;
    role: "ADMIN" | "USER";
    exp: number; // Ablaufzeit des Tokens
}