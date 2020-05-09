import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

import ProdutoService from '../../app/produtoService'
import Card from '../../components/card'

const init = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
}

class CadastroProduto extends Component{
    
    constructor(){
        super();
        this.service = new ProdutoService();
    }

    state = init;

    componentDidMount(){
        const sku = this.props.match.params.sku; 
        if(sku){
            const resultado = this.service.obterProdutos().filter( produto => produto.sku === sku );
            if(resultado.length === 1){
                const produto = resultado[0];
                this.setState({ ...produto, atualizando: true });
            }
        }
    }

    onChange = (event) =>{
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    onSubmit = (event) =>{
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        };
        
        try{
            this.service.save(produto);
            this.limpaCampos(event);
            this.setState({ sucesso: true });
        }catch(erro){
            console.log('erro')
            console.log()
            const errors = erro.errors;
            console.log(errors);
            this.setState({ errors: errors });
        }
        
    }

    limpaCampos = (event) =>{
        event.preventDefault();
        this.setState(init);
    }

    render(){
        let state = this.state;

        return(
            <div id='cadastro-produto'>
                <Card header={state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto'}>
                    <form id="form-produto" onSubmit={this.onSubmit}>

                        {
                             state.sucesso && (
                                <div className="alert alert-dismissible alert-success">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    <strong>Obrigado</strong> ficamos muito feliz com essa compra até a próxima !!
                                </div>
                            )
                        }

                        {
                            state.errors.length > 0 &&
                            state.errors.map( msg => {
                                return(
                                    <div className="alert alert-dismissible alert-danger">
                                        <button name={msg} type="button" className="close" data-dismiss="alert">
                                            &times;
                                        </button>
                                        <strong>Erro !</strong> {msg}
                                    </div>
                                );
                            })
                        }

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nome: *</label>
                                    <input value={state.nome} name="nome" onChange={this.onChange} 
                                        type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>SKU: *</label>
                                    <input value={state.sku} name="sku" onChange={this.onChange} 
                                        type="text" className="form-control" disabled={state.atualizando}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Descrição: </label>
                                    <textarea value={state.descricao} name="descricao"
                                        onChange={this.onChange} className="form-control"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Preço: *</label>
                                    <input value={state.preco} name="preco" onChange={this.onChange} 
                                        type="number" className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Fornecedor: *</label>
                                    <input value={state.fornecedor} name="fornecedor" onChange={this.onChange}
                                        type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-success">
                                    {state.atualizando ? 'Atualizar' : 'Salvar'}
                                </button>
                            </div>

                            <div className="col-md-1">
                                <button onClick={this.limpaCampos} className="btn btn-danger">Limpar</button>
                            </div>
                        </div>

                    </form>
                </Card>
            </div>
        );
    }
}

export default withRouter(CadastroProduto);