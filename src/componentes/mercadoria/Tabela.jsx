import { useContext } from 'react'
import MercadoriaContext from './MercadoriaContext';
import Alerta from '../Alerta';

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, setEditar, recuperar, remover} = useContext(MercadoriaContext);

    return (
        <div style={{ padding: '20px' }}>
        <h1>Mercadorias</h1>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={() => {
                setObjeto({
                    codigo: "", nome: "", preco_custo: "", preco_venda: "", estoque: "", fornecedor : ""
                });
                setEditar(false);
                setAlerta({ status: "", message: "" });
            }}>
            Novo <i className="bi bi-file-earmark-plus"></i>
        </button>
        <Alerta alerta={alerta} />
        {listaObjetos.length === 0 && <h1>Nenhum fornecedor encontrado</h1>}
        {listaObjetos.length > 0 && (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign : 'center' }}>Ações</th>
                        <th scope="col">Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço Custo</th>
                        <th scope="col">Preço Venda</th>
                        <th scope="col">Estoque</th>
                        <th scope="col">Fornecedor</th>
                    </tr>
                </thead>
                <tbody>
                    {listaObjetos.map(objeto => (
                        <tr key={objeto.codigo}>
                            <td align="center">
                                <button className="btn btn-info"
                                    data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                    onClick={() => {
                                        recuperar(objeto.codigo);
                                        setEditar(true);
                                        setAlerta({ status: "", message: "" });
                                    }}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-danger" title="Remover"
                                    onClick={() => { remover(objeto); }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                            <td>{objeto.codigo}</td>
                            <td>{objeto.nome}</td>
                            <td>{objeto.preco_custo}</td>
                            <td>{objeto.preco_venda}</td>
                            <td>{objeto.estoque}</td>
                            <td>{objeto.fornecedor_nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
    )
}

export default Tabela;