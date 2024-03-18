import React from 'react';
import Row from './Row';
import requests from './requests';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>HEY!!!</h1>
      <Row title = "Netflix Originals" fetchUrl={requests.fetchNetflixOriginals}></Row>
    </div>
  );
}

export default App;
