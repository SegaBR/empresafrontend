import { useContext } from 'react'
import Alerta from '../Alerta';
import MercadoriaContext from './MercadoriaContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, listaFornecedores, alerta } = useContext(MercadoriaContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mercadoria</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}>
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
                                <label htmlFor="txtPrecoCusto" className="form-label">
                                    Preço Custo
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtPrecoCusto"
                                    name="preco_custo"
                                    value={objeto.preco_custo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtPrecoVenda" className="form-label">
                                    Preço Venda
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtPrecoVenda"
                                    name="preco_venda"
                                    value={objeto.preco_venda}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtEstoque" className="form-label">
                                    Estoque
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtEstoque"
                                    name="estoque"
                                    value={objeto.estoque}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectFornecedor" className="form-label">
                                    Fornecedor
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectselectFornecedorPerson"
                                    value={objeto.fornecedor}
                                    name="fornecedor"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione a fornecedor)</option>
                                    {listaFornecedores.map((fornecedor) => (
                                        <option key={fornecedor.codigo} value={fornecedor.codigo}>
                                            {fornecedor.nome}
                                        </option>
                                    ))}
                                </select>
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