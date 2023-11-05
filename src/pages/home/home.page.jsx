import "./home.styles.scss";
import { Sidebar } from "../../components/sidebar/sidebar.component"
import { Chat } from "../../components/chat/chat.component"
import { motion } from "framer-motion";


export const Home = () => {
    const routerVarients = {
        initia: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    }
    return (
        <motion.div
            variants={routerVarients}
            initial="initial"
            animate="animate"
            exit="exit"
            className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </motion.div>
    )
}