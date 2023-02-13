import "./home.styles.scss";
import { Sidebar } from "../../components/sidebar/sidebar.component"
import { Chat } from "../../components/chat/chat.component"

export const Home = () => {

    return(
        <div className="home">
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}