import "./navbar.styles.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return(
        <div className="navbar">
            <span className="logo">Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={ () => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

