import React, { useEffect, useState } from 'react';

import MeuModal from '../../components/AdicionarReceita';

import api from '../../service/api';

const ReceitasList = () => {
    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        // Faz uma requisição GET para buscar as receitas
        api.get('/receitas.json')
            .then(response => {
                setReceitas(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar as receitas:', error);
            });
    }, []);

    if (!receitas) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div>
            <h1>Lista de Receitas</h1>
            <ul>
                {receitas.map(receita => (
                    <li key={receita.id}>
                        <h2>{receita.titulo}</h2>
                        <p>{receita.modoPreparo}</p>
                    </li>
                ))}
            </ul>
            <MeuModal />
        </div>
    );
};

export default ReceitasList;
