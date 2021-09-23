import { useState, useEffect } from 'react';
import config from '../../Config';
import MercadoriaContext from './MercadoriaContext';
import Tabela from './Tabela';
import Form from './Form';

function Mercadoria() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaFornecedores, setListaFornecedores] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", preco_custo: "", preco_venda: "", estoque: "", fornecedor : ""
    })


    const recuperaFornecedores = async () => {
        await fetch(`${config.enderecoapi}/fornecedores`)
            .then(response => response.json())
            .then(data => setListaFornecedores(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaMercadorias = async () => {
        await fetch(`${config.enderecoapi}/mercadorias`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }    

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/mercadorias/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaMercadorias();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/mercadorias/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {

        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome,
                    preco_custo: objeto.preco_custo,
                    preco_venda: objeto.preco_venda,
                    estoque: objeto.estoque,
                    fornecedor : objeto.fornecedor
                };
                await fetch(config.enderecoapi + '/mercadorias', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        setAlerta({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome,
                    preco_custo: objeto.preco_custo,
                    preco_venda: objeto.preco_venda,
                    estoque: objeto.estoque,
                    fornecedor : objeto.fornecedor
                };
                await fetch(config.enderecoapi + '/mercadorias', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        setAlerta({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }
        }
        recuperaMercadorias();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaFornecedores();
        recuperaMercadorias();
    }, []);

    return (
        <MercadoriaContext.Provider value={
            {
                objeto, setObjeto,
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                listaFornecedores, setListaFornecedores,
                editar, setEditar,
                recuperaFornecedores,
                recuperar,
                remover,
                acaoCadastrar,
                handleChange
            }
        }>
            <Tabela />
            <Form />
        </MercadoriaContext.Provider>
    );
}

export default Mercadoria;