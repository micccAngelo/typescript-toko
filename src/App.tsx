import React, { useEffect, useState } from 'react';
import './App.css';
import AuthContext from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import AddProduct from './Pages/Admin/Add Product/AddProduct';
import HomeAdmin from './Pages/Admin/Home/HomeAdmin';
import OutletNav from './Outlet/OutletNav';
import { Home } from './Pages/Home User/Home';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (window.location.pathname === '/') {
      window.location.replace('/User/Home');
    }
  }, [isLoggedIn]); 
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<OutletNav />} />

          <Route path='Admin'>
            <Route path='Home' element={<HomeAdmin />} />
            <Route path='AddProduct' element={<AddProduct />} />
          </Route>

          <Route path='User'>
            <Route path='Home' element={<Home />} />
          </Route>
          
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
