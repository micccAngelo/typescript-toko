import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../Components/Navbar/AppNavbar';

const OutletNav: React.FC = () => {
  return (
    <>
      <main className='App'>
        <AppNavbar />
        <Outlet />
      </main>
    </>
  );
};

export default OutletNav;
