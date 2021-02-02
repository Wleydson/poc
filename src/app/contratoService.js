import { cloneElement } from "react";

const CONTRATO = '_CONTRATO';

export function ErrorValidacao(errors){
    this.errors = errors;
}

export default class ContratoService{

    obtercontratos = () =>{
        const contratos = localStorage.getItem(CONTRATO);
        if(contratos == null){
            return []
        }

        return JSON.parse(contratos);
    }

    obterIndex = (id) =>{
        let index = null;
        this.obtercontratos().forEach( (contrato, i) =>{
            if(contrato.id === id){
                index = i;
            }
        });
        return index;
    }

    deletar = (id) =>{
        const index = this.obterIndex(id);
        if(index !== null){
            const contratos = this.obtercontratos();
            contratos.splice(index, 1);
            localStorage.setItem(CONTRATO, JSON.stringify(contratos));
            return contratos;
        }
    }

    save = (contrato) =>{
        this.validar(contrato)
    
        let contratos = localStorage.getItem(CONTRATO);
        
        if(!contratos){
            contratos = [];
        }else{
            contratos = JSON.parse(contratos);
        }

        const index = this.obterIndex(contrato.sku);

        if(index === null){
            contratos.push(contrato);
        }else{
            contratos[index] = contrato;
        }
        
        localStorage.setItem(CONTRATO, JSON.stringify(contratos));
    }

    validar = (contrato) => {
        const errors = [];

        if(!contrato.id){
            errors.push('O id é um campo Obrigatório');
        }

        if(!contrato.descricao){
            errors.push('O nome é um campo Obrigatório');
        }

        if(!contrato.dataVigenciaInicial){
            errors.push('O Data Inicial é um campo Obrigatório');
        }

        if(!contrato.dataVigenciaFinal || contrato.preco <= 0){
            errors.push('O Data Final é um campo Obrigatório e deve ser maior do que zero(0)');
        }

        if(!contrato.taxaComissao){
            errors.push('O Taxa Comissão é um campo Obrigatório');
        }

        if(errors.length > 0){
            throw new ErrorValidacao(errors);
        }
    }
} 