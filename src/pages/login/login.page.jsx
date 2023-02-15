import "../register/register.styles.scss";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate ,Link } from "react-router-dom";

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
            <div className='form-wrapper'>
                <span className="logo">Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}> 
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button>Sign up</button>
                    {err && <span>Something went wrong</span> }
                    <p>You have an account ? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}