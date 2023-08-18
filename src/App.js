import { FiSearch } from 'react-icons/fi';
import { useState } from 'react'; 
import api from './services/api'
import './App.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function searchCEP(){
    if(input == ''){
      alert('Preencha algum CEP!');
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert('Opps.. Erro ao buscar!')
      setInput('');
    }
  }

  return (
    <div className="content">
      <div className='header'>
        <h1>Buscador de CEP</h1>
      </div>
      <div className='inputBox'>

        <input
        className='input'
        type='number'
        placeholder='Digite seu CEP...'
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        />

        <button className='button' onClick={searchCEP}>
          <FiSearch size={20} color='#fff' className='IconFi'/>
        </button>

      </div>

      {Object.keys(cep).length > 0 && (
        <div className='result'>
          <h3>CEP: {cep.cep}</h3>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </div>
      )}
      
    </div>
  );
}

export default App;
