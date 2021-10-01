import './App.css';
import { Route } from 'react-router-dom'
import Nav from './components/nav/';
import GeneralPages from './components/render'
import CountryDetails from './components/countryDetail';
import FormActivity from './components/formActivity';
import Inicio from './components/inicio';
import About from './components/about';

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
      <Route path="/api" component = {About} />
    </div>
  );
}

export default App;
