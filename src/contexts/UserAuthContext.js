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
                // console.log(token)
                if (token) {
                    const resMe = await axios.get('user/me');
                    setUser(resMe.data.user)
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
        // console.log(res.data.token)
        const resMe = await axios.get('/user/me');
        setUser(resMe.data.user);
        // console.log(resMe.data.user)
    }

    const register = async (firstName, lastName, email, password, confirmPassword) => {
        const res = await axios.post('/user/register', {firstName, lastName, email, password, confirmPassword});
        // setUserAccessToken(res.data.token);
        // const resMe = await axios.get('/user/me');
        // setUser(resMe.data.user);
      };


    return (
        <UserAuthContext.Provider value={{ register, user, login }}>
            {children}
        </UserAuthContext.Provider>
    );
}

const useAuth = () => {
    const ctx = useContext(UserAuthContext);
    return ctx;
};

export default UserAuthContextProvider;

export { UserAuthContext, useAuth };