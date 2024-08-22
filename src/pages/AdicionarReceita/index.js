import React, { useState } from 'react';
import api from '../../service/api';

const MeuComponente = () => {
  const [dados, setDados] = useState({
    titulo: '',
    ingrediente: '',
    modoPreparo: ''
  });

  const handleChange = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/receitas.json', dados);
      console.log('Resposta da API:', response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titulo"
        value={dados.titulo}
        onChange={handleChange}
        placeholder="Titulo"
      />
      <input
        type="text"
        name="ingrediente"
        value={dados.ingrediente}
        onChange={handleChange}
        placeholder="Ingrediente"
      />
      <input
        type="text"
        name="modoPreparo"
        value={dados.modoPreparo}
        onChange={handleChange}
        placeholder="Modo de Preparo"
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MeuComponente;
