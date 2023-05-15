<template>
    <HeaderTemplate v-on:search="searchList"></HeaderTemplate>

    <!--Espaço entre nav e conteudo-->
    <div class="mt-3"></div>
    
    <div class="container-lg">
        <!--Titulo-->
        <div class="text-center mb-4 mt-4"> <span class="h1 text-warning fw-bold fs-1" >Produtos</span></div>
        <!--agrupamento dos card - Realizar lógica para criar 5 cards por grupo-->
        <FiltroProduto></FiltroProduto>
        <div class="row mt-3"  >
            <!--card-->
            <div  class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 " v-for="produto in filteredList" :key="produto.id" >
                <div class="card  shadow" style="width: 15rem; height: 19rem;">
                    <div class="container text-center">
                        <img :src=produto.imagem  class="card-img-top img-produto" >
                    </div>
                    <div class="card-body border ">
                        <small class="text-danger fw-bold">{{produto.marcaProduto}}</small><br>
                        <span class="text-muted fs-6">{{produto.produto}}<span> - {{produto.descricao}}</span></span>
                        <p class="h6 ">{{ Number(produto.preco).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}}</p>
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


export default defineComponent({
    
    name: "TesteView",
    components: {
        HeaderTemplate,
        FiltroProduto,
        
    },
    data() {
        return {
            produtos: [] as IProduto[],
            filteredList: {} as IProduto[],
            searchTerm: '',
            
        };
    },
    created() {
        this.getProdutos();
        this.filteredList = this.produtos;
        
    },  
    methods: {
        async getProdutos() {
            
            await api.get("filtro/list-produto")
            .then((response) => (
                this.produtos = response.data
            ))
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

