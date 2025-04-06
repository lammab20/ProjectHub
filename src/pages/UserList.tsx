import {useWsStore} from "../utils/ws/WsStore.ts"; // Annahme: Dein User-Interface

export const UserList = () => {
    const {users} = useWsStore();

    return (
        <div>
            <h3>Logged in Users</h3>
            {users.length > 0 &&
                <li>
                    {users.map(u => <li>{u.email}</li>)}
                </li>
            }
        </div>
    );
};