import React, { useState } from 'react';
import api from '../../service/api';

const AdicionarReceita = () => {
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoDePreparo, setModoDePreparo] = useState('');

  const [post, setPost] = useState({
    titulo1: '',
    ingredientes1: '',
    modoDePreparo1: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPost({ titulo1: titulo, ingredientes1: ingredientes, modoDePreparo1: modoDePreparo });

    console.log(post)

    console.log(titulo)

    api.post('/receitas.json', post)

    setPost({
      titulo1: '',
      ingredientes1: '',
      modoDePreparo1: ''
    });
  };

  return (
    <div>
      <h1>Adicionar Receita</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredientes (separados por vírgula):</label>
          <input
            type="text"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          />
        </div>
        <div>
          <label>Modo de Preparo:</label>
          <textarea
            value={modoDePreparo}
            onChange={(e) => setModoDePreparo(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Adicionar Receita</button>
      </form>
    </div>
  );
};

export default AdicionarReceita;
