import "../register/register.styles.scss";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate ,Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }
        catch(err){
            setErr(true);
        }
    }

    return(
        <div className="form-container">
            {err && <span className="error">Something went wrong</span> }
            <div className='form-wrapper'>
                <Logo className="logo"/>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}> 
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button>Sign up</button>
                    <p>You have an account ? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}