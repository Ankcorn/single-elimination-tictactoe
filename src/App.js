import React from 'react';
import { Router } from '@reach/router';
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
} from 'mongodb-stitch-browser-sdk';
import Header from './components/Header';
import Home from './pages/Tournaments';
import Create from './pages/CreateAI';


const client = Stitch.initializeDefaultAppClient('aivsai-cjsto');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('vs');

client.auth.loginWithCredential(new AnonymousCredential()).then(user => db.collection('ai').updateOne({ owner_id: client.auth.user.id }, { $set: { number: 42 } }, { upsert: true })).then(() => db.collection('ai').find({ owner_id: client.auth.user.id }, { limit: 100 }).asArray()).then((docs) => {
  console.log('Found docs', docs);
  console.log('[MongoDB Stitch] Connected to Stitch');
})
  .catch((err) => {
    console.error(err);
  });

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
