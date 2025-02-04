import React, { useContext } from 'react';
import { authContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const location = useLocation();

    if (loading) {
        
        return <div className="flex justify-center items-center text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (!user) {
        
        return <Navigate state={{ from: location.pathname }} to="/login" />;
    }

    return children; 
};

export default PrivateRoute;
