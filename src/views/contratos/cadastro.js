import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

import ContratoService from '../../app/contratoService'
import Card from '../../components/card'

const init = {
    id: '',
    descricao: '',
    dataVigenciaInicial:  '',
    dataVigenciaFinal:  '',
    taxaComissao: '',
    taxaDevolucao: '',
    ativo: true,
    errors: [],
    atualizando: false
}

class CadastroContrato extends Component{
    
    constructor(){
        super();
        this.service = new ContratoService();
    }

    state = init;

    componentDidMount(){
        const id = this.props.match.params.id; 
        if(id){
            const resultado = this.service.obtercontratos().filter( contrato => contrato.id === id );
            if(resultado.length === 1){
                const contrato = resultado[0];
                this.setState({ ...contrato, atualizando: true });
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
        const contrato = {
            id: this.state.id,
            descricao: this.state.descricao,
            dataVigenciaInicial: this.state.dataVigenciaInicial,
            dataVigenciaFinal: this.state.dataVigenciaFinal,
            taxaComissao: this.state.taxaComissao,
            taxaDevolucao: this.state.taxaDevolucao
        };
        
        try{
            this.service.save(contrato);
            this.limpaCampos(event);
            this.setState({ sucesso: true });
        }catch(erro){
            const errors = erro.errors;
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
            <div id='cadastro-contrato'>
                <Card header={state.atualizando ? 'Atualização de Contrato' : 'Cadastro de Contrato'}>
                    <form id="form-contrato" onSubmit={this.onSubmit}>

                        {
                             state.sucesso && (
                                <div className="alert alert-dismissible alert-success">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    Contrato cadastrado
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
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>ID: *</label>
                                    <input value={state.id} name="id" onChange={this.onChange} 
                                        type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="form-group">
                                    <label>Nome: *</label>
                                    <input value={state.descricao} name="descricao" onChange={this.onChange} 
                                        type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Data Inicial: *</label>
                                    <input value={state.dataVigenciaInicial} name="dataVigenciaInicial" onChange={this.onChange} 
                                        type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Data Final: *</label>
                                    <input value={state.dataVigenciaFinal} name="dataVigenciaFinal" onChange={this.onChange} 
                                        type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Taxa Comissão: *</label>
                                    <input value={state.taxaComissao} name="taxaComissao" onChange={this.onChange} 
                                        type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Taxa devolução:</label>
                                    <input value={state.taxaDevolucao} name="taxaDevolucao" onChange={this.onChange} 
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

export default withRouter(CadastroContrato);