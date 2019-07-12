import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
} from 'mongodb-stitch-browser-sdk';
import Header from './components/Header';
import Home from './pages/Tournaments';
import Create from './pages/CreateAI';
import Battle from './pages/Battle';

const client = Stitch.initializeDefaultAppClient('aivsai-cjsto');
const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('vs');


function App() {
  const [ai, setAI] = useState(null);
  useEffect(() => {
    client.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      setAI(db.collection('ai'));
    });
  }, []);
  return (
    <div className="w-screen h-screen bg-gray-800">
      <Header text="AI vs AI" />
      <Router>
        <Home path="/" />
        <Create path="/create" ai={ai} />
        <Battle path="/battle" ai={ai} />
      </Router>
    </div>
  );
}

export default App;
