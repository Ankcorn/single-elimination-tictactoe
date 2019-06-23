import React from 'react';

import Close from 'react-feather/dist/icons/x';


function Leader({ open, toggle }) {
  return open && (
  <div key={4} className="flex justify-center items-center h-screen w-screen fixed">
    <div className="shadow-2xl p-2 rounded-lg bg-gray-100 w-10/12 h-64 m-4">
      <button className="static  right-0" type="button" onClick={() => toggle()}>
        <Close />
      </button>
    </div>
  </div>
  );
}

export default Leader;
