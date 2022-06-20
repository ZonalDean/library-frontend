import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import {
    getUserAccessToken,
    setUserAccessToken,
    removeUserAccessToken
} from '../services/localStorage';

const UserAuthContext = createContext();

function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const token = getUserAccessToken()
                if (token) {
                    if (user.isStaff) {
                        const resMe = await axios.get('staff/me');
                        setUser(resMe.data.user)
                    } if (user.isUser) {
                        const resMe = await axios.get('user/me');
                        setUser(resMe.data.user)
                    }
                }
            } catch (err) {
                removeUserAccessToken()
                navigate('/')
            }
        };

        fetchMe();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('/user/login', { email, password });
        setUserAccessToken(res.data.token);
        const resMe = await axios.get('/user/me');
        setUser(resMe.data.user);
    }

    const register = async (firstName, lastName, email, password, confirmPassword) => {
        const res = await axios.post('/user/register', { firstName, lastName, email, password, confirmPassword });
    };

    const logout = () => {
        removeUserAccessToken();
        setUser(null);
    };

    // Staff

    const staffLogin = async (email, password) => {
        const res = await axios.post('/staff/login', { email, password });
        setUserAccessToken(res.data.token);
        const resMe = await axios.get('/staff/me');
        setUser(resMe.data.user);
    }

    const staffRegister = async (firstName, lastName, email, password, confirmPassword) => {
        const res = await axios.post('/staff/newstaff', { firstName, lastName, email, password, confirmPassword });
    };


    return (
        <UserAuthContext.Provider value={{ register, user, login, logout, staffLogin, staffRegister }}>
            {children}
        </UserAuthContext.Provider>
    );
}

const useUserAuth = () => {
    const ctx = useContext(UserAuthContext);
    return ctx;
};

export default UserAuthContextProvider;

export { UserAuthContext, useUserAuth };