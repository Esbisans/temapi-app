import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuthStore } from '../hooks/useAuthStore';
import { useChatStore } from '../hooks/useChatStore';
import { getEnv } from '../helpers/getEnv';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { VITE_API_URL } = getEnv();

    const { socket, online, connectSocket, disconnectSocket } = useSocket(VITE_API_URL);
    const { loadUsers , newMessage, loadLastMessages, loadUnseenMessages } = useChatStore();

    const {status} = useAuthStore();

    useEffect(() => { 
        if (status === 'authenticated') {
            connectSocket();
        }
    }, [status, connectSocket])

    useEffect(() => {
        if (status === 'logout') {
            disconnectSocket();
        }
    }, [status, disconnectSocket])

    //Escuchar los cambios en el estado de autenticación
    useEffect(() => {
        socket?.on('user:list', (users) => {
            console.log(users);
            loadUsers(users)
        })
    }, [socket])

    useEffect(() => {
        socket?.on('personal:message', (message) => {
            newMessage(message);
        })

    } , [socket])
    
    useEffect(() => {
        socket?.on('last:messages', (lastMessages) => {
            console.log(lastMessages);
            loadLastMessages(lastMessages)
        })
    }, [socket])

    useEffect(() => {
        socket?.on('unseen:messages', (unseenMessages) => {
            console.log(unseenMessages);
            loadUnseenMessages(unseenMessages)
        })
    }, [socket])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}