import React, { useEffect } from 'react';
import './Logout.css';

const Logout = () => {

    useEffect(() => {
        // Clear local storage (remove the authToken)
        localStorage.removeItem('authToken');

        //redirect to login
        window.location.href = '/login';
    }, []);

    return <div></div>;
};

export default Logout;
