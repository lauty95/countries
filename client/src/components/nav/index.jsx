import React, {useEffect} from 'react'
//import { $CombinedState } from 'redux';
import estilo from './nav.css'

function validate (input) {
    let error = {};
    if(/^[0-9]/.test(input)) {
        error.value = 'inputSearch inputError'
    } else {
        error.value = 'input'
    }
    return error;
}

function Nav() {

    const [input, setInput] = React.useState('')
    const [error, setError] = React.useState({value: 'input'});
    const [continents, setContinents] = React.useState ([])

    useEffect( () => {
        fetch('http://localhost:3001/api/continents')
          .then (res => res.json())
          .then (data => setContinents(data))
    }, []);

    const handleChange = function (e){
        setInput(() => {
            const state = e.target.value
            const validation = validate(state);
            setError(validation);
            return state;
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (/^[0-9]/.test(input)){
            alert ('Ingrese una palabra válida')
        } else {
            let res = await
            fetch(`http://localhost:3001/api/countries/name/${input}`)
            let data = await res.json();
            if (data[0].nombre){
                alert(data[0].nombre)
            } else {
                alert('No se encontro coincidencias')
            }
        }
    }

    return (
        <nav className= {estilo.nav}>
            <select name="Orden" className={estilo.orden}>
                <option value="az">Alfabético A-Z</option>
                <option value="za">Alfabético Z-A</option>
                <option value="mayor">Mayor población</option>
                <option value="menor">Menor población</option>
            </select>
            <select name="Filtrar" className={estilo.orden}>
                {continents.map(c => <option key={c}>{c}</option>)}
            </select>
            <form onSubmit={handleSubmit}>
                <input className={error.value} name="countrySearch" value={input} onChange={handleChange}/>
                <button>Buscar</button>
            </form>
        </nav>
    )
}
export default Nav;