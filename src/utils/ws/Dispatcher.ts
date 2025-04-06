import {useWsStore} from "./WsStore.ts";
import {IUserWS} from "../../models/IUserWS.ts";
import {IMessage} from "../../models/IMessage.ts";
import {IUser} from "../../models/IUser.ts";

class Dispatcher {
    static dispatch(msg: IMessage) {
        switch (msg.type) {
            case "LOGIN":
                useWsStore.getState().setUser(msg.payload as IUserWS);
                break;
            case "USER_LIST":
                console.log("hallo")
                useWsStore.getState().setUsers(msg.payload as IUser[]);
                console.log("Message Erhalten");
                console.log("users: ", useWsStore.getState().users)
                break;
        }
    }
}

export default Dispatcher;