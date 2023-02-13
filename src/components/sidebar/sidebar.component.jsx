import "./sidebar.styles.scss";
import { Navbar } from "../navbar/navbar.component";
import { Search } from "../search/search.component";
import { Friend } from "../friend/friend.component";


export const Sidebar = () => {
    return(
        <div className="sidebar">
            <Navbar/>
            <Search/>
            <Friend/>
        </div>
    )
}