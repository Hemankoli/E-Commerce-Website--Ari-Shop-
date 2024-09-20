import React, {useEffect, useState} from 'react'
import { useAuth } from '../../Context'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const PrivateRoute = () => {
    const [auth] = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user-auth', {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                });
                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Authorization failed:', error);
                setOk(false);
            }
        };
    
        if (auth?.token) authCheck();
    }, [auth?.token]);
    

  return (
    <div>
        {ok ? <Outlet/> : <Spinner path='' />}
    </div>
  )
}

export default PrivateRoute
