import React from 'react';
import { Link } from '@reach/router';
import img from '../machine.jpg';
import architecture from '../architecture.jpg';

function Home() {
  return (
    <ul className="h-screen w-screen flex flex-col sm:flex-row justify-around items-center sm:p-40 p-20">
      <Link to="create" className="cursor-pointer m-8">
        <button type="button" className="flex flex-col text-white w-56 h-56 sm:w-64 sm:h-64 rounded-lg shadow-2xl">
          <span className="bg-blue-800 opacity-75 absolute rounded-tl-lg rounded-br-lg px-2 text-white font-bold capitalize">Create an AI</span>
          <img className="rounded-t-lg flex-grow" src={img} alt="robot playing the piano" />
          <p className="w-full bg-blue-800 rounded-b-lg py-2 text-green-100 font-semibold">Create</p>
        </button>
      </Link>
      <Link to="/battle" className="cursor-pointer m-8">
        <button type="button" className="flex flex-col text-white w-56 h-56 sm:w-64 sm:h-64 rounded-lg shadow-2xl">
          <span className="bg-blue-800 opacity-75 absolute rounded-tl-lg rounded-br-lg px-2 text-white font-bold capitalize">PvP Battle</span>
          <img className="rounded-t-lg flex-grow" src={architecture} alt="robot playing the piano" />
          <p className="w-full bg-blue-800 rounded-b-lg py-2 text-green-100 font-semibold">Battle</p>
        </button>
      </Link>
    </ul>
  );
}

export default Home;
