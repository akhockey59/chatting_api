import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utility/services";


export const useFetchReciepientUser = (chat, user)=>{
    const [reciepientUser, setReciepientUser] = useState('');
    const [error, setError] = useState(null);



    const reciepientId = chat?.members?.find((id) => id !== user?._id);
    //const reciepientId = chat?.members?.find((id) => id !== user?._id);
    useEffect(()=>{
        const getUser = async()=>{
            if(!reciepientId) return null;
            //console.log("Recipient ID:", reciepientId);
            try {
                const response = await getRequest(`${baseUrl}/Users/find/${reciepientId}`);
            console.log("Response", response);
            if(!response){
                return setError(response);
            }
            setReciepientUser(response);
            } catch (error) {
                setError(error.message);
            }
            
        };
        getUser();
    },[reciepientId]);
    //console.log("recipient ..", reciepientUser);
    return {reciepientUser, error};
};
