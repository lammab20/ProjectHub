import {useWsStore} from "./WsStore.ts";
import Dispatcher from "./Dispatcher.ts";
import {IMessage} from "../../models/IMessage.ts";

class WSHandler {
    private socket: WebSocket | undefined = undefined;

    constructor() {
        this.handleConnection();
    }

    handleConnection(){
        this.socket = new WebSocket("ws://localhost:8080");

        this.socket.onopen = () => {
            useWsStore.getState().setIsConnected(true);
        }

        this.socket.onclose = () => {
            useWsStore.getState().setIsConnected(false);
        }
        this.socket.onmessage = (event) => {
            const msg:IMessage = JSON.parse(event.data);
            Dispatcher.dispatch(msg);
            console.log("Message eingegangen im frotnend", msg)
        }
    }

    sendMessage(message: IMessage): void {
        this.socket?.send(JSON.stringify(message));
    }
}

export default new WSHandler();