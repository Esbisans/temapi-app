import { useDispatch, useSelector } from "react-redux"
import { addMessage, messagesLoaded, setActiveChat, usersLoaded, lastMessagesLoaded, unseenMessagesLoaded, chatLogout } from "../store/chat/chatSlice";
import temapiApi from "../api/temapiApi";
import toast from "react-hot-toast";


export const useChatStore = () => {

    const {chatActive, users, messages, lastMessages, unseenMessages} = useSelector(state => state.chat);
    const dispatch = useDispatch();

    const loadUsers = (users) => {
        dispatch( usersLoaded(users) );
    }

    const loadMessages = async (uid) => {

        try {
            const {data} = await temapiApi.get(`api/messages/${uid}`);
            dispatch( messagesLoaded(data.messages) );
        }
        catch (error) {
            console.log(error);
        }

    }

    const loadLastMessages = async (lastMessages) => {
        dispatch( lastMessagesLoaded(lastMessages) );
    }

    const loadUnseenMessages = async (unseenMessages) => {
        dispatch( unseenMessagesLoaded(unseenMessages) );
    }

    const newMessage = async (message) => {
        dispatch(addMessage(message));
    }

    const activateChat = (uid) => {
        dispatch( setActiveChat(uid) );
    }

    const logoutClearChat = () => {
        dispatch( chatLogout() );
    }

    return {
        chatActive,
        users,
        messages,
        lastMessages,
        unseenMessages,

        loadUsers,
        loadMessages,
        loadLastMessages,
        loadUnseenMessages,
        newMessage,
        activateChat,
        logoutClearChat
    }

}