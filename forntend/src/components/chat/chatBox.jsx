import { useContext, useState } from "react";
import { Authcontext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchReciepientUser } from "../../hooks/useFetchReciepient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import img from "../../assets/wolverine.jpg";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {

    const { user } = useContext(Authcontext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
    const { reciepientUser, error } = useFetchReciepientUser(currentChat, user);
    const [textMessage, setTextmessage] = useState("");


    if (!reciepientUser)
        return (
            <p style={{ textAlign: "center", width: "100%" }}> no conversation selected yet</p>
        );
    if (isMessagesLoading)
        return (
            <p style={{ textAlign: "center", width: "100%" }}> loading chats...........</p>
        );


    return (<Stack gap={4} className="chat-box">
        <div className="chat-header" style={{ width: '1100px', height: '50px' }}>
            <strong>
                {reciepientUser?.name}
            </strong>
        </div>
        <Stack gap={3} className="messages" style={{ width: '1100px', height: '750px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {messages && messages.map((message, index) => (
    <Stack key={index} style={{
        alignSelf: message?.senderId === user?._id ? 'flex-end' : 'flex-start',
        backgroundColor: message?.senderId === user?._id ? '#289D8C' : 'black',
        borderRadius: '8px',
        padding: '8px',
        flexGrow: '0',
        width: 'auto'
    }}>
        <span>{message.text}</span>
        <span className="message-footer">{moment(message.createdAt).calendar()}</span>
    </Stack>
))}
        </Stack>
        <Stack direction="horizontal" gap={3} className="chat-inpot flex-grow-0">
            <InputEmoji value={textMessage} onChange={setTextmessage} fontFamily="Calligraffitti" borderColor="rgba(72, 112, 223, 0.2)" />
            <button className="send-btn" style={{ marginRight: '10px' }} onClick={() => sendTextMessage(textMessage, user, currentChat._id, sendTextMessage)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
            </button>
        </Stack>
    </Stack>);
}

export default ChatBox;