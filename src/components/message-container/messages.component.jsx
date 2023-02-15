import "./messages.styles.scss";
import { Message } from "../message/message.component";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chat.context";
import { onSnapshot , doc} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const Messages = () => {
    const [ messages, setMessages ] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc => {
            doc.exists() && setMessages(doc.data().messages)
        }))

        return ()=>{
            unsub();
        }
    }, [data.chatId])

    return(
        <div className="messages">
            {messages.map(message => <Message message={message} key={message.id}/>)}
        </div>
    )
}