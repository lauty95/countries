import './App.css';
import { Route } from 'react-router-dom'
import Nav from './components/nav/';
import GeneralPages from './render'
import CountryDetails from './components/countryDetail';

function App() {

  return (
    <div className="App">
      <Route path="/api" component ={Nav} />
      <Route path="/api" component = {GeneralPages} exact />
      <Route path="/api/country/:nombre" exact render= {({match}) => {
        const pais = match.params.nombre;
        return <CountryDetails nombre = {pais}/>
      }} />
    </div>
  );
}

export default App;
