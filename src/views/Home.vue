<template>
    <HeaderTemplate @produto-pesquisado="pesquisarProduto" @produtos-by-categoria="filtrarProdutosByCategoria"></HeaderTemplate>

    <!--Espaço entre nav e conteudo-->
    <div class="mt-3"></div>
    
    <div class="container-lg">
        <!--Titulo-->
        <div class="text-center mb-4 mt-4"> <span class="h1 text-warning fw-bold fs-1" >{{ nomeCategoria }}</span></div>
        <!--Filtro e Limpar Filtro-->
        <FiltroProduto @filtro-aplicado="aplicarFiltro" @restaurar-filtro="restaurarFiltro"></FiltroProduto>
        <div class="row mt-3 "  >
            <!--card-->
            <div  class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 mt-4 " v-for="produto in produtos" :key="produto.id" >
                <div class="card  shadow" style="width: 15rem; height: 19rem;">
                    <div class="container text-center">
                        <img :src="produto.imagem"  class="card-img-top img-produto" >
                    </div>
                    <div class="card-body border ">
                        <small class="text-danger fw-bold">{{produto.marcaProduto}}</small><br>
                        <span class="text-muted fs-6">{{produto.produto}}<span> - {{produto.descricao}}</span></span>
                        <div class="text-center mt-4"><button class="btn btn-outline-warning" @click="produtoAdd(produto)">Adicionar <i class="fa-solid fa-circle-plus"></i></button></div>
                    </div>
                </div>
            </div>    
        </div>  
        <div v-if="produtos.length == 0" class="no-results-message">
            <span class="h4 text-muted">Nenhum produto foi encontrado</span>
        </div>
        
        <Cart v-if="isLogged" :cartItems="carrinho" @removeProduto="removeCarrinho" @limpaCarrinho="limpaCarrinho"></Cart>

    </div>
           
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderTemplate from '@/components/HeaderTemplate.vue'
import FiltroProduto from '@/components/FiltroProduto.vue'
import api from '@/http/index'
import IProduto from '@/interfaces/IProduto'
import Cart from '@/components/Cart.vue'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
export default defineComponent({
    
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components: {
        HeaderTemplate,
        FiltroProduto,
        Cart
        
    },
    data() {
        return {
            produtos: [] as IProduto[],
            produtoPesquisado: '',
            precoMinimo: 0,
            precoMaximo: 0,
            guardarProdutoPesquisado: '',
            nomeCategoria: 'Produtos',
            produtoEscolhido: {} as IProduto,
            carrinho: [] as IProduto[],
            isLogged: Cookies.get('token')
        };
    },
    mounted() {
        const produtoPesquisado = localStorage.getItem('produtoPesquisado');
        const categoriaId = localStorage.getItem('categoriaId')
        if (produtoPesquisado) {
            this.guardarProdutoPesquisado = produtoPesquisado as string;
            this.filtrarProduto(produtoPesquisado);
            localStorage.removeItem('produtoPesquisado');
        }
        else if (categoriaId) {
            const nomeCategoria = localStorage.getItem('nomeCategoria') as string;
            this.filtrarCategoria(categoriaId,nomeCategoria);
            localStorage.removeItem('nomeCategoria');
            localStorage.removeItem('categoriaId');
        }
        else {
            this.getProdutos();
        }
    },
    methods: {
        async getProdutos() {       
            await api.get("filtro/list-distinct-produto")
            .then((response) => {
                this.produtos = response.data
        })
            .catch((err) => console.log("Erro: " + err));
        },
        async filtrarProduto(produto:string) {
            await api.get('filtro/produto?produto='+produto)
            .then((response) => {
                this.produtos = response.data
            })
            .catch((error) => {
                console.log(error)
            })
        },
        aplicarFiltro(dadosFiltro: { precoMinimo: number, precoMaximo: number }) {
            this.precoMinimo = dadosFiltro.precoMinimo;
            this.precoMaximo = dadosFiltro.precoMaximo;
            this.filtrarPreco();
        },
        async filtrarPreco() {
            if(this.guardarProdutoPesquisado != '' && this.guardarProdutoPesquisado != null){
                await api.get('filtro/produto?produto='+ this.guardarProdutoPesquisado +'&precoMin='+ this.precoMinimo +'&precoMax='+this.precoMaximo)
                .then((response) => {
                    this.produtos = response.data;
                })
                .catch((error) => {
                    console.log("Error: "+error)
                })
            }
            
        },
        pesquisarProduto(produto: string) {
            this.guardarProdutoPesquisado = produto;
            this.filtrarProduto(produto);

        },
        restaurarFiltro(restaurar:boolean){
            if(restaurar){
                this.getProdutos;
            }
        },
        filtrarProdutosByCategoria(data: {produtos: IProduto[], nome:string}){
            this.produtos = data.produtos;
            this.nomeCategoria = data.nome;
        },
        produtoAdd(produto : IProduto){
            let findProduct = this.carrinho.find(element => element.produto === produto.produto);

            if (findProduct) {
            this.carrinho.find(element => {
                if(element.produto == produto.produto){
                element.qtde += 1
                }
            })
            
            
            } else {
                produto.qtde = 1
                this.carrinho.push(produto);
            }
        },
        removeCarrinho(produto : IProduto){
            const index = this.carrinho.indexOf(produto);

            if (index !== -1) {
                this.carrinho.splice(index, 1);
                Swal.fire({
                            title: 'Produto Removido',
                            text: 'Produto removido com Sucesso!',
                            icon: 'success',
                        })
            }
        },
        limpaCarrinho(){
            this.carrinho = []
        },
        async filtrarCategoria(idCategoria: string, nomeCategoria: string) {
            await api.get('filtro/list-produtos-by-categoria/'+ idCategoria)
                .then((response) => {
                    this.nomeCategoria = nomeCategoria;
                    this.produtos = response.data;
                })
                .catch((error) => {
                    console.log("Erro ao filtrar produtos por categoria: "+ error);
                })
        },
    },
})
</script>

<style scoped>
.img-produto{
  height: 120px;
  width: 120px;
}
.no-results-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1; /* Defina um valor menor do que o elemento que está sendo sobreposto */
  }
</style>


