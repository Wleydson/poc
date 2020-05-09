
const PRODUTOS = '_PRODUTOS';

export function ErrorValidacao(errors){
    this.errors = errors;
}

export default class ProdutoService{

    obterProdutos = () =>{
        const produtos = localStorage.getItem(PRODUTOS);
        if(produtos == null){
            return []
        }
        return JSON.parse(produtos);
    }

    obterIndex = (sku) =>{
        let index = null;
        this.obterProdutos().forEach( (produto, i) =>{
            if(produto.sku === sku){
                index = i;
            }
        });
        return index;
    }

    deletar = (sku) =>{
        const index = this.obterIndex(sku);
        if(index !== null){
            const produtos = this.obterProdutos();
            produtos.splice(index, 1);
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
            return produtos;
        }
    }

    save = (produto) =>{
        this.validar(produto)
    
        let produtos = localStorage.getItem(PRODUTOS);
        
        if(!produtos){
            produtos = [];
        }else{
            produtos = JSON.parse(produtos);
        }

        const index = this.obterIndex(produto.sku);

        if(index === null){
            produtos.push(produto);
        }else{
            produtos[index] = produto;
        }
        
        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
    }

    validar = (produto) => {
        const errors = [];

        if(!produto.nome){
            errors.push('O nome é um campo Obrigatório');
        }

        if(!produto.sku){
            errors.push('O SKU é um campo Obrigatório');
        }

        if(!produto.preco || produto.preco <= 0){
            errors.push('O Preço é um campo Obrigatório e deve ser maior do que zero(0)');
        }

        if(!produto.fornecedor){
            errors.push('O Fornecedor é um campo Obrigatório');
        }

        if(errors.length > 0){
            throw new ErrorValidacao(errors);
        }
    }
} 