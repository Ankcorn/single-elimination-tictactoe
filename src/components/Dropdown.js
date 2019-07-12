import React from 'react';

function Dropdown({ options, value, onChange }) {
  return (
    <select>
      {options && options.map(el => <option value={el.name}>{el.name}</option>)}
    </select>
  );
}

export default Dropdown;
