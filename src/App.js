import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import ImageViewerPage from './pages/ImageViewerPage';
import ActionPage from './pages/approveRequstes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/showReport/:recordId" element={<RecordPage />} />
        <Route
          path="/image-viewer/:studyUID/:seriesUID"
          element={<ImageViewerPage />}
        />
        <Route path="/approved-report/:recordId" element={<ActionPage actionType="approve" />} />
        <Route path="/cancel-report/:recordId" element={<ActionPage actionType="cancel" />} />
      </Routes>
    </Router>
  );
};

export default App;
