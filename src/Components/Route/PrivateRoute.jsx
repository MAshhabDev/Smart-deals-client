import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    if (!user) {
        return <Navigate to="/register" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;