import React from 'react';
import Canvas from './Canvas';
import Button from './Button';
import './App.css';


const App = () =>{
  return (
    <div className='body'>
      <div className='left list'>
        <Button />
      </div>
      <div className='right list canvas'>
        <Canvas />
      </div>
          
    </div>
  );
}

export default App;
