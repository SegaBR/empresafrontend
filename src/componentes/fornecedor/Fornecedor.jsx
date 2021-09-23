import { useState, useEffect } from 'react';
import config from '../../Config';
import FornecedorContext from './FornecedorContext';
import Tabela from './Tabela';
import Form from './Form';

function Fornecedor() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", cnpj: "", telefone: "", cep: ""
    })

    const recuperaFornecedores = async () => {
        await fetch(`${config.enderecoapi}/fornecedores`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/fornecedores/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaFornecedores();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/fornecedores/${codigo}`)
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
                    cnpj: objeto.cnpj,
                    telefone: objeto.telefone,
                    cep: objeto.cep
                };
                await fetch(config.enderecoapi + '/fornecedores', {
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
                    cnpj: objeto.cnpj,
                    telefone: objeto.telefone,
                    cep: objeto.cep
                };
                await fetch(config.enderecoapi + '/fornecedores', {
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
        recuperaFornecedores();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaFornecedores();
    }, []);

    return (
        <FornecedorContext.Provider value={
            {
                objeto, setObjeto,
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
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
        </FornecedorContext.Provider>
    );
}

export default Fornecedor;