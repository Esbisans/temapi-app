import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { chatSlice } from "./chat/chatSlice";
import { mapSlice } from "./map/mapSlice";
import { UISlice } from "./UI/UISlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
        map: mapSlice.reducer,
        ui: UISlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});