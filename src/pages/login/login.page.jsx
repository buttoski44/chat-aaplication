import "../register/register.styles.scss";


export const Login = () => {

    return(
        <div className="form-container">
            <div className='form-wrapper'>
                <span className="logo">Chat</span>
                <span className="title">Login</span>
                <form> 
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button>Sign up</button>
                    <p>You have an account ? Register</p>
                </form>
            </div>
        </div>
    )
}