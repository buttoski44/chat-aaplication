import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { AuthContext } from "./auth.context";

const INITIAL_STATE = {
    chatId:"null",
    user:{}
}


export const ChatContext = createContext();

export const ChatContextProvider = ({children}) =>{
    const { currentUser } = useContext(AuthContext);

    const chatReducer = (state, action) => {
        const {type, payload} = action;

        switch (type) {
            case "CHANGE_USER":
                return { 
                    chatId: currentUser.uid > payload.uid ? currentUser.uid + payload.uid : payload.uid + currentUser.uid,
                    user: payload,
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return <ChatContext.Provider value={{data:state, dispatch}}>{children}</ChatContext.Provider>
}