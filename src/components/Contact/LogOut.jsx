import { React, useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Store/auth';

export default function LogOut() {

    const{ LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);

  return <Navigate to="/contact/login" />;
}
