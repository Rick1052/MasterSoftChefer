import React, { useState } from 'react';

const MeuModal = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };


    const handleSubmit = (e) => {
        alert("Salvo")
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={toggleModal}>
                Abrir Modal
            </button>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adicionar Receita</h5>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        name="titulo"
                                        placeholder="Titulo"
                                    />
                                    <input
                                        type="text"
                                        name="ingrediente"
                                        placeholder="Ingrediente"
                                    />
                                    <input
                                        type="text"
                                        name="modoPreparo"
                                        placeholder="Modo de Preparo"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={toggleModal}>
                                        Fechar
                                    </button>
                                    <button type='submit' className="btn btn-primary">Salvar Mudanças</button>
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

export default MeuModal;
