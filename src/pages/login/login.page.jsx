import "../register/register.styles.scss";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { motion, LayoutGroup } from "framer-motion";
export const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const routerVarients = {
        initia: {
            opacity: 0.9,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0.9,
            scale: 0.9
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }
        catch (err) {
            setErr(true);
        }
    }

    return (
        <motion.div
            variants={routerVarients}
            initial="initial"
            animate="animate"
            exit="exit"
            className="form-container">
            <motion.div
                layout
                className='form-wrapper'>
                <Logo className="logo" />
                <h2 className="title">Login</h2>
                <motion.form layout onSubmit={handleSubmit}>
                    <motion.input layout type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    {err && <span
                        variants={routerVarients}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="error">
                        <p>Something went wrong</p>
                        <button onClick={() => setErr(false)}><Close /></button>
                    </span>}
                    <button>Sign up</button>
                    <motion.p layout>You have an account ? <Link to="/register">Register</Link></motion.p>
                </motion.form>
            </motion.div>
        </motion.div>
    )
}