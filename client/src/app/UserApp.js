import React from 'react';

import Unauthorized from '../pages/error-pages/Unauthorized';
// import ProtectedRoute from '../components/ProtectedRoute';
import api from '../utils/api';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect } from 'react';

const UserApp = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let email = "admin@admin.com";
  //     let password = "adminadmin";
  //     try {
  //       let { data } = await api.post('/auth/login', { email, password });
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err.response.data);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <div className="App">
      User App
    </div>
  );
}

export default UserApp;
