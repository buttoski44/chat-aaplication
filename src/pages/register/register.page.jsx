import "./register.styles.scss";
import Add from "../../assets/addAvatar.png";
import { useState } from "react";
import { auth, storage, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { motion } from "framer-motion";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.log(error)
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          });
        }
      );
    }
    catch (err) {
      setErr(true);
    }
  }

  const routerVarients = {
    initia: {
      opacity: 0.9,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0.8,
      scale: 0.9
    }
  }


  return (
    <motion.div
      variants={routerVarients}
      initial="initial"
      animate="animate"
      exit="exit"
      className="form-container">
      <div className='form-wrapper'>
        <Logo className="logo" />
        <span className="title">register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <input type="file" id="file" style={{ display: "none" }} />
          {err && <span className="error">
            <p>Something went wrong</p>
            <button onClick={() => setErr(false)}><Close /></button>
          </span>}
          <button>Sign up</button>
        </form>
        <p>You dont have an account ? <Link to="/login">Login</Link></p>
      </div>
    </motion.div>
  )
}
