import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout, onDeleteUser, onReconnect } from "../store/auth/authSlice";
import temapiApi from "../api/temapiApi";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore";


export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    
    const {logoutClearChat} = useChatStore();

    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {

        dispatch( onChecking());

        const loginPromise = temapiApi.post('/api/login', { email, password });

        toast.promise(
            loginPromise,
            {
                loading: 'Logging in...',
                success: (data) => `Successfully logged in as ${data.data.user.name}`,
                error: (error) => {
                    const errorMessage = error.response?.data?.msg || error.message;
                    return `Login failed: ${errorMessage}`;
                },
            },
            {
                success: {
                    duration: 5000,
                },
                error: {
                    duration: 5000,
                },
            }
        );

        try {
            
            //const {data} = await temapiApi.post('/api/login', { email, password });
            const { data } = await loginPromise;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            const {user} = data;
            dispatch(onLogin({name: user.name, uid: user.uid}));

        } catch (error) {
            console.log(error);
            dispatch(onLogout('login error'));
        }
    }

    const startRegister = async ({ name, email, password }) => {

        dispatch( onChecking());

        const registerPromise = temapiApi.post('/api/login/new', { name, email, password });

        toast.promise(
            registerPromise,
            {
                loading: 'Registering...',
                success: (data) => `Successfully registered as ${data.data.user.name}`,
                error: (error) => {
                    const errorMessage = error.response?.data?.msg || error.message;
                    return `Registration failed: ${errorMessage}`;
                },
            },
            {
                success: {
                    duration: 5000,
                },
                error: {
                    duration: 5000,
                },
            }
        );

        try {

            //const {data} = await temapiApi.post('/api/login/new', { name, email, password });
            const { data } = await registerPromise;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const {user} = data;
            dispatch(onLogin({name: user.name, uid: user.uid}));

        } catch (error) {
            console.log(error);
            dispatch(onLogout('login error'));
        }
    }

    const startDeleteUser = async() => {
            dispatch(onDeleteUser());

            const deletePromise = temapiApi.delete(`/api/login/delete/${user.uid}`);
    
            toast.promise(
                deletePromise,
                {
                    loading: 'Deleting user...',
                    success: (data) => 'Successfully deleted user',
                    error: (error) => {
                        const errorMessage = error.response?.data?.msg || error.message;
                        return `Deletion failed: ${errorMessage}`;
                    },
                },
                {
                    success: {
                        duration: 5000,
                    },
                    error: {
                        duration: 5000,
                    },
                }
            );

            try {

                //const {data} = await temapiApi.delete(`/api/login/delete/${uid}`);
                
                const { data } = await deletePromise;

                //message
                localStorage.clear();
                dispatch(onLogout());
                logoutClearChat();
            } catch (error) {
                console.log(error);
                dispatch(onReconnect());
            }
    }

    const checkAuthToken = async () => {
    
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(onLogout());
            return;
        }
    
        try {
            const {data} = await temapiApi.get('/api/login/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const {user} = data;
            dispatch(onLogin({name: user.name, uid: user.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
        logoutClearChat();
    }

    return {
        // Properties
        status,
        user,
        errorMessage,
        
        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        startDeleteUser
    }
}
