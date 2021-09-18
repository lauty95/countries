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
      <Route path="/api/country/:id" exact render= {({match}) => {
        const pais = match.params.id;
        return <CountryDetails id = {pais}/>
      }} />
    </div>
  );
}

export default App;
