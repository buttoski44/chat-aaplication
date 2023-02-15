import "./friend.styles.scss";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/auth.context";
import { ChatContext } from "../../context/chat.context";

export const Friend = () => {
    const [friends, setFriends] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () =>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setFriends(doc.data())
              });

            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats();
    },[currentUser.uid])

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER" , payload: u})
    }


    return(
        <div className="friend">
            {Object.entries(friends)?.sort((a,b) => b[1].date - a[1].date).map(friend => (
                <div className="user-chat" key={friend[0]} onClick={() => handleSelect(friend[1].userInfo)}>
                    <img src={friend[1].userInfo.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span>{friend[1].userInfo.displayName}</span>
                        <p>{friend[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))
        }  
        </div>
    )
}