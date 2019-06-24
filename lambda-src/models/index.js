import mongoose from 'mongoose';

require('dotenv').config();


const uri = process.env.MONGO_CONNECTION_STRING;
let conn = null;

export default async () => {
  if (conn === null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    conn.model('AI', new mongoose.Schema({
      name: { type: String, unique: true },
      gamesPlayed: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      code: String,
    }));
  }

  return {
    AI: conn.model('AI'),
  };
};
