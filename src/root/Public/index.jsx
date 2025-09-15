import React from 'react';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router';

const PublicRoot = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default PublicRoot;
