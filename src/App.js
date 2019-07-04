import React from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import Home from './pages/Tournaments';
import Create from './pages/CreateAI';

function App() {
  return (
    <div className="w-screen h-screen bg-gray-800">
      <Header text="AI vs AI" />
      <Router>
        <Home path="/" />
        <Create path="/create" />
      </Router>
    </div>
  );
}

export default App;
