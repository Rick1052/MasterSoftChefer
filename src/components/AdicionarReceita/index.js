import React, { useState } from 'react';
import api from '../../service/api';

import './addReceita.css';

const AddReceita = () => {
    const [showModal, setShowModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [ingredientes, setIngredientes] = useState(['']);
    const [modoPreparo, setModoPreparo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const novaReceita = {
                titulo,
                ingredientes: ingredientes.filter(ing => ing.trim() !== ''), 
                modoPreparo
            };
            const response = await api.post('data.json', novaReceita);
            setSuccess('Receita adicionada com sucesso!');
            console.log('Receita adicionada: ', response.data);
            setTitulo('');
            setIngredientes(['']);
            setModoPreparo('');
            toggleModal();
            window.location.reload();
        } catch (error) {
            setError('Erro ao adicionar receita');
            console.error('Erro ao adicionar receita: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleIngredientChange = (index, event) => {
        const newIngredientes = [...ingredientes];
        newIngredientes[index] = event.target.value;

        if (index === newIngredientes.length - 1 && event.target.value.trim() !== '') {
            setIngredientes([...newIngredientes, '']);
        } else {
            setIngredientes(newIngredientes);
        }
    };

    const removeIngredientField = (index) => {
        const newIngredientes = ingredientes.filter((_, i) => i !== index);
        setIngredientes(newIngredientes);
    };

    return (
        <div>
            <button className="btn btn-primary" id="btn-modal" onClick={toggleModal}>
                Adicionar Receita
            </button>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Adicionar Receita</h4>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="modal-body d-grid gap-3">

                                    <div>
                                        <label className='form-label'>Título: </label>
                                        <input
                                            type="text"
                                            name="titulo"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            placeholder="Título"
                                            className='form-control'
                                        />
                                    </div>

                                    <div>
                                        <label className='form-label'>Ingredientes: </label>
                                        {ingredientes.map((ingrediente, index) => (
                                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <input
                                                    type="text"
                                                    value={ingrediente}
                                                    onChange={(event) => handleIngredientChange(index, event)}
                                                    placeholder={`Ingrediente ${index + 1}`}
                                                    className='form-control'
                                                    style={{ marginRight: '8px' }}
                                                />
                                                <button type="button" onClick={() => removeIngredientField(index)} className="btn btn-danger">
                                                    -
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className='form-label'>Modo de Preparo: </label>
                                        <textarea
                                            name="modoPreparo"
                                            value={modoPreparo}
                                            onChange={(e) => setModoPreparo(e.target.value)}
                                            placeholder="Modo de Preparo"
                                            className='form-control'
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                        Fechar
                                    </button>
                                    <button type='submit' className="btn btn-primary">
                                        {loading ? 'Enviando...' : 'Salvar'}
                                    </button>
                                    {success && <p>{success}</p>}
                                    {error && <p>{error}</p>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}

            {showModal && <div className="modal-backdrop show"></div>}
        </div>
    );
};

export default AddReceita;