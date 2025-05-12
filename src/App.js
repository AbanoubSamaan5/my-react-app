import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';

const App = () => {
  return (
    <Router basename="/my-react-app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/showReport/:recordId" element={<RecordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
