import React from 'react';
import Canvas from './Canvas';
import Button from './Button';
import './App.css';


const App = () =>{
  return (
    <div>
      <h1>Reactive Deffusion Simulation</h1>
      <div className='body'>
        <Button />
        <Canvas />
      </div>

    </div>
    
  );
}

export default App;
