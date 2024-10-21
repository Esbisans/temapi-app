import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // checking | authenticated | not-authenticated
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, action) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, action) => {
            state.status = 'logout';
            state.user = {};
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        onDeleteUser: (state) => {
            state.status = 'deleting';     
        },
        onReconnect: (state) => {
            state.status = 'authenticated';
        },
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage, onDeleteUser, onReconnect } = authSlice.actions;