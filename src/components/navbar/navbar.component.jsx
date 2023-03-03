import "./navbar.styles.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ReactComponent as Logo } from "../../assets/logo.svg";
export const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return(
        <div className="navbar">
            <Logo className="logo"/>
            <div className="user">
                <span>{currentUser.displayName}</span>
                <img src={currentUser.photoURL} alt="" />
                <button onClick={ () => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

