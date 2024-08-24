import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Receitas() {
    const { id } = useParams(); // Obtém o id da URL
    const [receita, setReceita] = useState(null);
    const [error, setError] = useState(null); // Estado para capturar erros

    useEffect(() => {
        // Fazendo a requisição GET para buscar a receita específica
        axios.get(`http://localhost:4000/data.json/${id}`)
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
            <p>{receita.ingredientes + ""}</p>
            <p>{receita.modoPreparo}</p>
            {/* Outros detalhes da receita */}
        </div>
    );
}

export default Receitas;
