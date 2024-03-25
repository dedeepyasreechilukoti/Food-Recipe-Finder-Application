import React from 'react';
import './App.css';
import Registration from './components/registration';
import Login from './components/login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/Home';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Registration/>} />
        <Route path="/login" element={<Login />} />
       <Route path="/home" element={<Home />} />
      </Routes>
    </div>
    </Router>
  
  );
}

export default App;
