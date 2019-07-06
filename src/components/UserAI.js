import React, { useState } from 'react';
import ReactAce from 'react-ace';

function UserAI({ code, onCodeChange, ai }) {
  const [name, setName] = useState('');
  const [state, setSuccess] = useState('Save');
  const [error, setError] = useState(undefined);

  function updateName(e) {
    setSuccess('Save');
    setError(undefined);
    setName(e.target.value);
  }

  async function saveAI() {
    try {
      setSuccess('Progress');
      await ai.insertOne({
        code, name, created_at: Date.now(), wins: 0,
      });
      return setSuccess('Success');
    } catch (e) {
      if (e.errorCode === 11) {
        return setError('Duplicate Name');
      }
      return setError('Unexpected Error');
    }
  }
  return (
    <div className="flex flex-col">
      <ReactAce
        mode="javascript"
        theme="github"
        value={code}
        height="400px"
        onChange={(updatedCode) => { setSuccess('Save'); onCodeChange(updatedCode); }}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2 bg-gray-300 mt-3 rounded">
        <input value={name} onChange={updateName} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="A unique name for your AI..." aria-label="Full name" />
        <button onClick={saveAI} disabled={state === 'Success' || error} className={`flex-shrink-0 ${error && 'bg-red-500 border-red-500'} ${state === 'Success' && 'bg-teal-500 border-teal-500'} ${state !== 'Success' && !error && 'bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700'} text-sm border-4 text-white py-1 px-2 rounded mr-3`} type="button">
          {error || state }
        </button>
      </div>
    </div>
  );
}

export default UserAI;
