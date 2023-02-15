import "./chat.styles.scss";
import Cam from "../../assets/cam.png"
import More from "../../assets/more.png"
import Add from "../../assets/add.png"
import { Messages } from "../message-container/messages.component";
import { Input } from "../input/input.component";
import { useContext } from "react";
import { ChatContext } from "../../context/chat.context";

export const Chat = () => {
    const { data } = useContext(ChatContext);

    return(
        <div className="chat">
            <div className="chat-info">
                <span>{data.user?.displayName}</span>
                <div className="chat-icons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}   