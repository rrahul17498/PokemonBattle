import { Outlet } from "react-router-dom";
import { SocketProvider } from "./data/socketIO/provider";



const Battle = () => {

    return (
        <SocketProvider>
            <Outlet />
        </SocketProvider> 
    )
};

export default Battle;