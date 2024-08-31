import React, { useEffect } from 'react'
import { isEmpty } from "lodash"
import useLocalStorage from '../hooks/useLocalStorage';
import { useUser } from '../contexts/UserProvider.jsx'
import { SocketProvider, useSocket } from '../contexts/SocketProvider.jsx';
import Login from './Login';
import Dashboard from './Dashboard';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/Authuser';
import NavBar from '../../components/NavBar/NavBar';

function App() {
    const { user, setUser } = useUser();
    const { socket } = useSocket();
    const [auth, setAuth] = useRecoilState(authState);
    useEffect(() => {
        console.log(auth.user);
    }, []);

    return (
        <div>
            <NavBar/>
            {
                isEmpty(auth.user) ? <Login /> : <Dashboard />
            }
        </div>
    )
}

export default App;
