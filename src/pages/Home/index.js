import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../service/api';

import AddReceita from '../../components/AdicionarReceita';
import './home.css';

const ReceitasList = () => {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar dados
    const fetchReceitas = async () => {
      try {
        const response = await api.get('data.json'); // Faz a requisição GET
        setReceitas(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        setError('Erro ao buscar receitas');
        console.error('Erro ao buscar receitas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container'>


      <div className='d-flex justify-content-end'>
        <AddReceita />
      </div>

      <ul className='list-rec'>
        {receitas.map(receita => (
          <li key={receita.id}>
            <Link to={`/receitas/${receita.id}`}>{receita.titulo}</Link>
          </li>
        ))}
      </ul>

    </div>
  );
};


export default ReceitasList;