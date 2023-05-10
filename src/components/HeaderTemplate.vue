<template>
    <header>
    <!--NAVBAR-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light">
            <div class="container-fluid p-2">
                <a class="navbar-brand pe-5 text-warning" href="#">PreçoPoint</a>
                <!--Botão para aparecer opções quando tela estiVer em proporção pequena-->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item  pe-3">
                            <a class="nav-link hover" aria-current="page" href="/" >Home</a>
                        </li>
                        <li class="nav-item dropdown  pe-3">
                            <a class="nav-link dropdown-toggle hover" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categoria
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="categorias.length != 0">
                                <li v-for="(categoria, index) in categorias" :key="index" >
                                    <router-link class="dropdown-item" :to="`/${categoria}`"> {{ categoria }}</router-link>
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
                            Suas listas
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="listas.length != 0">
                                <li v-for="(item, index) in listas" :key="index">
                                    <router-link class="dropdown-item" :to="`/lista-de-produtos/`" v-on:click="carregarListaProdutos((item.id).toString())"> {{ item.nome }}</router-link>
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
                                <input class="form-control me-2" type="text" placeholder="Pesquisar produto..." v-model="searchTerm" aria-label="Search">
                                <button class="btn btn-outline-warning" @click="pesquisar">Pesquisar</button>
                            
                 
                            </div>
                        </li>
                    </ul>
                    <div class="dropdown pe-4">
                        <a href="" class=" nav-link nav-item dropdown-toggle hover" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="../assets/user.png" alt="" height="30px" width="30px">
                            Opções usuário
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown2">
                            <li><router-link class="dropdown-item" to="/editar-usuario">Ver minha conta</router-link></li>
                            <li><a class="dropdown-item" href="/listas">Minhas Listas</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/login">Sair</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        
        
    </header>
</template>

<script lang="ts">
import axios from "axios"
import Cookies from "js-cookie"
import { defineComponent } from "vue"
import ILista from "../interfaces/ILista"
    export default defineComponent({
        name: "HeaderTemplate",
        emits: ['search'],
        
        data () {
            return{
                searchTerm: "",
                listas: [] as ILista[],
                categorias:[]
            }
        },

        created(){
            this.getListas()
            this.getCategorias()
        },

        methods:{
            carregarListaProdutos(id : string){
                Cookies.set('lista', id , {secure:true, httpOnly: false})
            },

            pesquisar() {
            
                if (window.location.pathname === "/") {
                    // Se o usuário estiver na página Home
                    this.$emit("search", this.searchTerm);
                } else {
                    // Se o usuário não estiver na página Home
                    this.$router.push("/")
                    .then(() => {
                        this.$emit("search", this.searchTerm);
                    });
                }

            },

            async getListas(){
                try {
                    const token = Cookies.get("token")
                    const headers = {
                        'Authorization': `Bearer ${token}`
                    };

                    axios.post('http://localhost:8080/lista/getlista-consumidor', {nome:"Otavio Quirino", email : "otavio@gmail.com"}, { headers })
                    .then(response => {
                        const data = response.data;
                        console.log(data);
                        this.listas = data;
                    })
                    .catch(error => {
                        console.log('Erro:', error);
                    });
                }
                catch{
                    console.log("Erro ao carregar lista.")
                }
            },
            
            async getCategorias() {
            
                await axios.get("https://localhost:8080/lista/getlista-categoria", {
                    headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                    }
                })
                .then((response) => this.categorias = response.data)
                .catch((err) => console.log("Erro: " + err));
            }
      


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
