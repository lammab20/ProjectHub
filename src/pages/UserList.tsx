import {useWsStore} from "../utils/ws/WsStore.ts"; // Annahme: Dein User-Interface

export const UserList = () => {
    const {users} = useWsStore();

    console.log("users: ", users)

    return (
        <div>
            <h3>Logged in Users</h3>
            {users.map(u => <li>{u.email}</li>)}
        </div>
    );
};