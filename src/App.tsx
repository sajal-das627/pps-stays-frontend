import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PPSOneToken from './components/PPSAuth/PPSOneToken';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/pps-token"
        element={
          <ProtectedRoute>
            <PPSOneToken />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
