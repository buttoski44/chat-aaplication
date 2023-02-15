import "./input.styles.scss";
import Attach from "../../assets/attach.png";
import Img from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { ChatContext } from "../../context/chat.context";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";

export const Input = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handleSend = async () => {
        if(img){
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on( 
                (error) => {
                  console.log(error)
                //   setErr(true);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        await updateDoc(doc(db , "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                img:downloadURL,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                            }),
                        });
                    });
                }
            );
        }else{
            await updateDoc(doc(db , "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]:{
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })
            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]:{
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })
        }
        setText("");
        setImg(null);
    }

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    const handleChangeImg = (e) => {
        setImg(e.target.files[0]);
    }

    return(
        <div className="input">
            <input type="text" value={text} placeholder="Type someting" onChange={handleChangeText}/>
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{display:"none"}} id="file" onChange={handleChangeImg}/>
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}