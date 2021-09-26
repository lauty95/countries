import './App.css';
import { Route } from 'react-router-dom'
import Nav from './components/nav/';
import GeneralPages from './render'
import CountryDetails from './components/countryDetail';
import FormActivity from './components/formActivity';
import Inicio from './components/inicio';

function App() {

  return (
    <div className="App">
      <Route path="/" component={Inicio} exact/>
      <Route path="/api" component ={Nav} exact/>
      <Route path="/api" component = {GeneralPages} exact />
      <Route path="/api/country/:nombre" exact render= {({match}) => {
        const pais = match.params.nombre;
        return <CountryDetails nombre = {pais}/>
      }} />
      <Route path="/activity" component={FormActivity} exact />
    </div>
  );
}

export default App;
