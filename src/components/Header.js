import React from 'react';
import { Link } from '@reach/router';
import Home from 'react-feather/dist/icons/home';

function Header({ text }) {
  return (
    <Link to="/">
      <header
        className="fixed top-0 left-0 bg-blue-800 px-3 flex justify-around shadow-xl hover:bg-blue-700 text-gray-100 text-4xl skew"
      >
        <button className="m-4" type="button"><Home color="#2a4365" /></button>
        {text}
      </header>
    </Link>
  );
}

export default Header;
