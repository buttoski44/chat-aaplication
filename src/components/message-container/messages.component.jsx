import "./messages.styles.scss";
import { Message } from "../message/message.component";


export const Messages = () => {
    return(
        <div className="messages">
            <Message/>
            <Message/> 
        </div>
    )
}