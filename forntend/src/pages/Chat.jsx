import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { Authcontext } from "../context/AuthContext";
import UserChat from "../components/chat/UserChat";
import PotentialChats from "../components/chat/PotentialChats";
import { ChatContext } from "../context/ChatContext";
import ChatBox from "../components/chat/chatBox";

const Chat = () => {
    const {user} = useContext(Authcontext);
    const {userChats, isUserChatsLoading, updateCurrentChat} = useContext(ChatContext);
    return ( <>
    <Container>
        <PotentialChats/>
        {userChats?.length<1 ? null :(
            <Stack direction="horizontal" gap={4} className="align-item-start">
                <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatsLoading && <p>Loading Chats...</p>}
                    {userChats?.map((chat, index)=>{
                            return(
                                <div key={index} onClick = {()=> updateCurrentChat(chat)}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                            )
                    })}
                </Stack>

                <div style={{alignItems:"flex-start" }}>
                <ChatBox/>
                </div>
            </Stack>
        )}
    </Container>
    </> );
}
 
export default Chat;