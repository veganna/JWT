import { Navigate, Outlet } from 'react-router-dom'

import useAuth from "../hooks/useAuth";

const TherapistPrivateRoutes = () => {
    const [user, setUser] = useAuth();
    return (
        user ? user.role=="THERAPIST" ? <Outlet/> : <Navigate to='/'/> :<Navigate to='/login'/>
    )
}

export default TherapistPrivateRoutes;