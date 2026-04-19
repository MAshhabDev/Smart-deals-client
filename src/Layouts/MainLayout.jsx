import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
             <Outlet></Outlet>
            </main>
        </div>
    );
};

export default MainLayout;