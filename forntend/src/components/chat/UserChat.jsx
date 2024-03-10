import { Stack } from "react-bootstrap";
import { useFetchReciepientUser } from "../../hooks/useFetchReciepient";
import profilePic from "../../assets/man.svg";
const UserChat = ({chat, user}) => {
    const {reciepientUser} = useFetchReciepientUser(chat, user);
    if (reciepientUser === null) {
        return <div>Loading...</div>;
      }
    

    return <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button" >
        <div className="d-flex">
            <div className="me-2">
                <img src={profilePic} height="35px"/>
            </div>
            <div className="text-content">
                <div className="name">{reciepientUser?.name}</div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-item-end">
            <div className="date">
                12/12/2023
            </div>
            <div className="this-user-notification">2</div>
            <span className="user-online"></span>
        </div>
    </Stack>;
};
 
export default UserChat;