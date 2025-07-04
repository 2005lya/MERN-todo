
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup.jsx';

const routes = (
  <Router>
     <Routes>
     <Route path="/" exact element={<Navigate to="/login" />} />
    <Route path="/dashboard" exact element={<Home />}/>
    <Route path="/login" exact element={<Login />} />
    <Route path="/signup" exact element={<SignUp />} />
  </Routes>
  </Router>

)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
