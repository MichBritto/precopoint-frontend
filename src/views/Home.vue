<template>
    <HeaderTemplate v-on:search="searchList"></HeaderTemplate>

    <!--Espaço entre nav e conteudo-->
    <div class="mt-3"></div>
    
    <div class="container-lg">
        <!--Titulo-->
        <div class="text-center mb-4 mt-4"> <span class="h1 text-warning fw-bold fs-1" >Produtos</span></div>
        <!--agrupamento dos card - Realizar lógica para criar 5 cards por grupo-->
        <FiltroProduto ></FiltroProduto>
        <div class="row mt-3"  >
            <!--card-->
            <div  class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 " v-for="produto in filteredList" :key="produto.id" >
                <div class="card  shadow" style="width: 15rem; height: 19rem;">
                    <div class="container text-center">
                        <img src="https://d3o3bdzeq5san1.cloudfront.net/thumbs/290/289082.jpg" class="card-img-top img-produto" >
                    </div>
                    <div class="card-body border ">
                        <small class="text-danger fw-bold">{{produto.marcaProduto}}</small><br>
                        <span class="text-muted fs-6">{{produto.produto}}<span> - {{produto.descricao}}</span></span>
                        <p class="h6 ">R$ {{produto.preco}}</p>
                        <div class="text-center mt-4"><button class="btn btn-outline-warning">Adicionar</button></div>
                    </div>
                </div>
            </div>    
                    
        </div>  
        <div v-if="filteredList.length == 0" class="no-results-message">
            <span class="h4 text-muted">Nenhum produto foi encontrado</span>
        </div>
        

    </div>
           
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderTemplate from '@/components/HeaderTemplate.vue'
import FiltroProduto from '@/components/FiltroProduto.vue'
import api from '@/http/index'
import IProduto from '@/interfaces/IProduto'
import Cookies from 'js-cookie'


export default defineComponent({
    
    name: "TesteView",
    components: {
        HeaderTemplate,
        FiltroProduto,
        
    },
    data() {
        return {
            produtos: [{
                id: 1,
                produto: "Chocolate Kit Kat ao Leite",
                preco: "3.99",
                quantidade: 10,
                imagem: "https://d3o3bdzeq5san1.cloudfront.net/thumbs/290/289082.jpg",
                descricao: "41g",
                marcaProduto: "Carrefour"
            }, {
                id: 2,
                produto: "Bis Xtra Chocolate ao Leite",
                preco: "3.99",
                quantidade: 5,
                imagem: "https://images-americanas.b2w.io/produtos/01/00/img/89818/4/89818428_1GG.jpg",
                descricao: "45g",
                marcaProduto: "Americanas"
            },
            {
                id: 3,
                produto: "Fini Dentaduras",
                preco: "6.99",
                quantidade: 10,
                imagem: "https://images-americanas.b2w.io/produtos/01/00/img/6889/6/6889656_1GG.jpg",
                descricao: "90g",
                marcaProduto: "FiniStore"
            }] as IProduto[],
            filteredList: {} as IProduto[],
            searchTerm: '',
            
        };
    },
    created() {
        this.getProdutos();
        this.filteredList = this.produtos;
        
    },
    watch: {
        searchTerm(newTerm) {
            console.log(newTerm)
            this.searchList(newTerm);
        }
    },
   
    methods: {
        async getProdutos() {
            
            await api.get("produto/list-produto", {
                headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            .then((response) => this.produtos = response.data)
            .catch((err) => console.log("Erro: " + err));
        },
        searchList(searchTerm: string){
            this.getProdutos();
            this.filteredList = this.produtos;
            if(searchTerm == '') {
                this.filteredList = this.produtos
            }
            else{
                this.filteredList = []
                this.produtos.forEach(produto => {
                    
                    if(produto.produto.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
                        this.filteredList.push(produto)
                    }
                });
            }
        },
    }
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

