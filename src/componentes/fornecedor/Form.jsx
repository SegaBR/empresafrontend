import { useContext } from 'react'
import Alerta from '../Alerta';
import FornecedorContext from './FornecedorContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(FornecedorContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Fornecedor</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div> <form id="formulario" onSubmit={acaoCadastrar}>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtCnpj" className="form-label">
                                    CNPJ
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtCnpj"
                                    name="cnpj"
                                    value={objeto.cnpj}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtTelefone" className="form-label">
                                Telefone
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtTelefone"
                                    name="telefone"
                                    value={objeto.telefone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtCep" className="form-label">
                                CEP
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtCep"
                                    name="cep"
                                    value={objeto.cep}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Form;