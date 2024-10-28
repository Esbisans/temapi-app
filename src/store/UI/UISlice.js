import { createSlice } from "@reduxjs/toolkit";



export const UISlice = createSlice({
    name: 'UI',
    initialState: {
        isProfileMenuOpen: false,
        activeSection: 'chat',
    },
    reducers: {
        toggleProfileMenu: state => {
            state.isProfileMenuOpen = !state.isProfileMenuOpen;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        uiLogout: state => {
            state.isProfileMenuOpen = false;
            state.activeSection = 'chat';
        }
    }
});

export const { toggleProfileMenu, setActiveSection, uiLogout } = UISlice.actions;