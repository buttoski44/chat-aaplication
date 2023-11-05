import "./sidebar.styles.scss";
import { Navbar } from "../navbar/navbar.component";
import { Search } from "../search/search.component";
import { Friend } from "../friend/friend.component";
import { useState } from "react";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="sidebar">
            <Navbar />
            <Search isOpen={isOpen} setIsOpen={setIsOpen} />
            <Friend isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}