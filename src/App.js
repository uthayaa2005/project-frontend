import './App.css';
import { useEffect, useState } from 'react';

import Favorites from './Components/Favorites';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieSearch from './Components/MovieSearch';
import SignupPage from './Components/SignupPage';
import SigninPage from './Components/SigninPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<MovieSearch />} />
      </Routes>
    </Router>
    );
}


export default App;
