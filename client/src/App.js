import './App.css';
import { useState, useEffect } from 'react';
import Cards from './components/cards';
//import { Route } from 'react-router-dom'
import Nav from './components/nav/';

function App() {
  const [country, setCountry] = useState([]);
  
  useEffect( () => {
    fetch('http://localhost:3001/api/countries')
      .then (res => res.json())
      .then (data => setCountry(data))
  }, []);
  
  return (
    <div className="App">
      <Nav />
      <h1>Henry Countries</h1>
      <Cards paises = {country} />
    </div>
  );
}

export default App;
