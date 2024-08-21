import React, { useEffect, useState } from 'react';

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

    return (
        <div>
            <h1>Lista de Receitas</h1>
            <ul>
                {receitas.map(receita => (
                    <li key={receita.id}>
                        <h2>{receita.titulo}</h2>
                        <p>{receita.modo_de_preparo}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReceitasList;
