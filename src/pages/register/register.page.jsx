import "./register.styles.scss";
import Add from  "../../assets/addAvatar.png";

export const Register = () => {

    return(
        <div className="form-container">
            <div className='form-wrapper'>
                <span className="logo">Chat</span>
                <span className="title">register</span>
                <form> 
                    <input type="text" placeholder="display name"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <label for="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <input type="file" id="file" style={{display: "none"}}/>
                    <button>Sign up</button>
                    <p>You dont have an account ? Login</p>
                </form>
            </div>
        </div>
    )
}