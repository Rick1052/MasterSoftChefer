import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../../service/api';

function Receitas() {
    const { id } = useParams(); // Obtém o id da URL
    const [receita, setReceita] = useState(null);
    const [error, setError] = useState(null); // Estado para capturar erros

    console.log(id);

    useEffect(() => {
        // Fazendo a requisição GET para buscar a receita específica
        api.get(`functions/api?id=${id}`)
            .then(response => {
                setReceita(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar a receita:', error);
                setError('Receita não encontrada'); // Define a mensagem de erro
            });
    }, [id]);

    if (error) {
        return <div>{error}</div>; // Exibe a mensagem de erro, se houver
    }

    if (!receita) {
        return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto a requisição é feita
    }

    return (
        <div className='container'>
            <h1>{receita.titulo}</h1>
            <ul>
                {receita.ingredientes.map((ingrediente, index) => (
                    <li key={index}>
                        {ingrediente}
                        <br />
                    </li>
                ))}
            </ul>
            <p>{receita.modoPreparo}</p>

            <div className='d-flex justify-content-end'>
                <button className='btn btn-secondary'><Link to="/">Voltar</Link></button>
            </div>
        </div>
    );
}

export default Receitas;
