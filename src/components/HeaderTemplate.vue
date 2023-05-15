<template>
    <header>
    <!--NAVBAR-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light">
            <div class="container-fluid p-2">
                <a class="navbar-brand pe-5 text-warning" href="#">PreçoPoint <i class="fa-solid fa-location-dot"></i></a>
                <!--Botão para aparecer opções quando tela estiVer em proporção pequena-->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item  pe-3">
                            <a class="nav-link hover" aria-current="page" href="/" >Home <i class="fa-solid fa-house"></i></a>
                        </li>
                        <li class="nav-item dropdown  pe-3">
                            <a class="nav-link dropdown-toggle hover" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categoria <i class="fa-solid fa-tags"></i>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="categorias.length != 0">
                                <li v-for="(categoria, index) in categorias" :key="index" >
                                    <router-link class="dropdown-item" :to="`/${categoria}`"> {{ categoria.categoria }}</router-link>
                                </li>
                            </ul>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="categorias.length == 0">
                                <li class="text-center">
                                  <label>Sem Categorias</label>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown  pe-3">
                            <a class="nav-link dropdown-toggle hover" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Suas listas <i class="fa-solid fa-list"></i>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="listas.length != 0">
                                <li v-for="(item, index) in listas" :key="index">
                                    <router-link class="dropdown-item" :to="`/lista-de-produtos/`"  v-on:click="carregarListaProdutos((item.id).toString(), item.nomeLista)"> {{ item.nomeLista }}</router-link>
                                </li>
                            </ul>   
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="listas.length == 0">
                                <li class="text-center">
                                  <label>Sem Listas</label>
                                </li>
                            </ul>    
                        </li>
                        <li class="nav-item">
                            <div class="d-flex form-group">
                                <input v-model="produtoPesquisado" class="form-control me-2" type="text" placeholder="Pesquisar produto..." aria-label="Search">
                                <button class="btn btn-outline-warning"  @click="pesquisarProduto"><i class="fa-solid fa-magnifying-glass"></i></button>
                            
                 
                            </div>
                        </li>
                    </ul>
                    <div class="dropdown pe-4">
                        <a href="" class=" nav-link nav-item dropdown-toggle hover" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Opções usuário
                            <i class="fa-solid fa-user" height="30px" width="30px"></i>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown2">
                            <li><router-link class="dropdown-item" to="/editar-usuario">Ver minha conta</router-link></li>
                            <li><a class="dropdown-item" href="/listas">Minhas Listas</a></li>
                            <li><a class="dropdown-item" href="/produtos-fornecedor">Seus Produtos</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/login">Sair <i class="fa-solid fa-arrow-right-from-bracket"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        
        
    </header>
</template>

<script lang="ts">
import Cookies from "js-cookie"
import { defineComponent } from "vue"
import ILista from "../interfaces/ILista"
import api from "@/http"
import ICategoria from "@/interfaces/ICategoria"
    export default defineComponent({
        name: "HeaderTemplate",       
        data () {
            return{
                produtoPesquisado: '',
                listas: [] as ILista[],
                categorias:[] as ICategoria[],
            }
        },

        created(){
            this.getListas()
            this.getCategorias()
        },

        methods:{
            carregarListaProdutos(id : string, nomeLista: string){
                Cookies.set('lista', id , {secure:true, httpOnly: false})
                Cookies.set('nomeLista', nomeLista, {secure:true, httpOnly: false})
                if(this.$route.path === '/lista-de-produtos'){
                    window.location.reload()
                }
                
            },
            getListas(){   
                const token = Cookies.get("token")
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                if (token){
                    api.get(
                        "lista/getlista-consumidor/" + Cookies.get("email"),
                        { headers }
                    )
                    .then(response => {
                        const data = response.data;
                        this.listas = data;
                    })
                    .catch(error => {
                        console.log('Erro:', error);
                    });
                }
                
            },       
            async getCategorias() {
                await api.get("filtro/get-categorias")
                .then((response) => this.categorias = response.data)
                .catch((err) => console.log("Erro: " + err));
            },
            pesquisarProduto() {
                if (this.produtoPesquisado.trim() !== '') {
                    // Redirecionar para a página Home caso não esteja nela
                    if (this.$route.name !== 'Home') {
                        this.$router.replace({ name: 'Home' });
                    }
                    localStorage.setItem('produtoPesquisado', this.produtoPesquisado);
                    this.$emit('produto-pesquisado', this.produtoPesquisado);
                }
            },
        }
    })
</script>

<style scoped>
.estrelas input[type=radio] {
    display: none;
  }
  .estrelas label i.fa{
    font-size: 2.5em
  }
  .estrelas label i.fa:before {
    content:'\f005';
    color: #FC0;
  }
  .estrelas input[type=radio]:checked ~ label i.fa:before {
    color: #CCC;
  }

  .hover{
    color: white;
  }
  .hover:hover{
    color:#ffc107;
  }
</style>
