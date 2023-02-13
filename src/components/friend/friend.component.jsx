import "./friend.styles.scss";

export const Friend = () => {
    return(
        <div className="friend">
            <div className="user-chat">
                <img src="data:image/jpeg;base64,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" alt="" />
                <div className="user-chat-info">
                    <span>jane</span>
                    <p>hello</p>
                </div>
            </div>
        </div>
    )
}