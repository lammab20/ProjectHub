import {IUserWS} from "../../models/IUserWS.ts";
import {create} from "zustand";

interface wsStore {
    isConnected:boolean;
    user: IUserWS | undefined;
    users: IUserWS[];
    setIsConnected:(isConnected:boolean) => void
    setUser: (user:IUserWS | undefined) => void;
    setUsers: (users:IUserWS[]) => void;
}

export const useWsStore = create<wsStore>((set) => ({
    isConnected:false,
    user: undefined,
    users: [],
    setIsConnected:(isConnected:boolean) => set({isConnected}),
    setUser: (user:IUserWS | undefined) => set({user}),
    setUsers: (users:IUserWS[]) => set({users})
}));