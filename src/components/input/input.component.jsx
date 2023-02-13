import "./input.styles.scss";
import Attach from "../../assets/attach.png";
import Img from "../../assets/img.png";

export const Input = () => {
    return(
        <div className="input">
            <input type="text" placeholder="Type someting" />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{display:"none"}} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}