import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: "",
    chatActive: null,
    users: [],
    messages: [], //messages Active Chat
    lastMessages: [], 
    unseenMessages: [],
  };

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        usersLoaded: (state, action) => {
          state.users = action.payload;
        },
        setActiveChat: (state, action) => {
          if (state.chatActive !== action.payload) {
            state.chatActive = action.payload;
            state.messages = [];
          }
        },
        addMessage: (state, action) => {
          const { from, to } = action.payload;
          if (state.chatActive === from || state.chatActive === to) {
            state.messages.push(action.payload);
          }
        },
        messagesLoaded: (state, action) => {
          state.messages = action.payload;
        },
        lastMessagesLoaded: (state, action) => {
          state.lastMessages = action.payload;
        },
        unseenMessagesLoaded: (state, action) => {
          state.unseenMessages = action.payload;
        },

        chatLogout: () => initialState,
    },
    
});

export const { usersLoaded, setActiveChat, addMessage, messagesLoaded, lastMessagesLoaded, unseenMessagesLoaded, chatLogout } = chatSlice.actions;