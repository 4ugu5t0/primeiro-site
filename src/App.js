import {FiSearch} from 'react-icons/fi';
import { useState } from 'react';
import './styles.css';
import api from './services/api';

function App() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});
  
    async function handleSearch() {
      if(input === '') {
        alert('Preencha algum CEP para pesquisar!');
        return;
      }
      try {
        const response = await api.get(`${input}/json`);
        setCep(response.data);
        setInput('');
  
      }catch{
        alert('CEP não encontrado!');
        setInput('');
      }
  
    }
  
    return (
      <div className="container">
        <h1 className="title"> Buscador de CEP</h1>
        <div className="containerInput">
          <input
          type="text" 
          placeholder="Digite o CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"></FiSearch>
            </button>
        </div>
  
          {Object.keys(cep).length > 0 && (<main className='main'>
            <h2> CEP: {cep.cep} </h2>
            <span> Logradouro: {cep.logradouro} </span>
            <span> Bairro: {cep.bairro} </span>
            <span> Cidade: {cep.localidade} </span>
            <span> Estado: {cep.uf} </span>
          </main>)}
          
      </div>
    );
  }
  
  export default App; 