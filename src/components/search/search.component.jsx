import { useState } from "react";
import "./search.styles.scss";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDoc, setDoc, serverTimestamp, doc, updateDoc, getDocs } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { ReactComponent as Close } from "../../assets/close.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

export const Search = ({ isOpen, setIsOpen }) => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (err) setTimeout(() => {
            setErr(false)
        }, 2000)
    }, [err])
    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleClearUser = () => {
        if (user) {
            setUsername("");
            setUser(null);
        }
    }
    const handleSearch = async (e) => {
        const q = query(collection(db, "users"), where("displayName", "==", username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setErr(true);
        } else {
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        }

    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId))

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        } catch (err) {
            setErr(true);
        }
        setUser(null);
        setUsername("");
    }

    return (
        <div
            className="search">
            <div className="toggle">
                <button
                    onClick={() => { setIsOpen(!isOpen); handleClearUser() }}
                    data-isopen={isOpen}><SearchIcon /></button>
                <div
                    data-isopen={isOpen}
                    className="search-form">
                    <input type="text" placeholder="Find a user" value={username} onKeyDown={handleKey} onChange={handleChange} />
                    <button onClick={handleClearUser}><Close /></button>
                </div>
            </div>
            {err && <span>User not found</span>}
            {user && <div className="user-chat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div
                    data-isopen={isOpen}
                    className="user-chat-info">
                    <span>{user.displayName}</span>
                    <p>hello</p>
                </div>
            </div>}
        </div>
    )
}