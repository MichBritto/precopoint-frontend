<template>
    <Navbar></Navbar>
    <!--Body-->

    <div class="container"  >
        <!--                                   Header Body                                                  -->
       
            <div class="row">
                <div class="col">
                    <div class="d-flex justify-content-between mt-4 mb-4" >
                        <p></p>
                        <div class="text-center mx-auto "> <span class="h1 text-warning fw-bold" >Listas</span></div>
                        <a  href="/lista-de-produtos"><button type="button" class="btn btn-dark hover">Criar Lista</button></a>
                        
                    </div>
                </div>
            </div> 
            <hr>   
                       
        <div class="row" >
            <div class="col-lg-4 mb-4 d-flex align-items-lg-center " v-for="(lista, index) in listas" :key="index" >
                <div class="card shadow me-5">
                        
                        <div class="card-body border" style="width: 18rem; height: 10rem">
                            <h6 class="fw-bold text-muted text-center" style="font-size: 20px">{{ lista.nome }}</h6>
                            <div class="container text-center mt-3">
                                <router-link :to="{ name: 'ListaProduto'}">
                                    <button class="btn btn-warning" @click="carregarListaProdutos((lista.id).toString())">Editar</button>
                                </router-link>
                                <button class="btn btn-danger ms-2">Excluir</button>
                            </div>
                        </div>
                    </div>  
            </div> 
            
            <div v-if="listas.length == 0" class="d-flex align-items-center justify-content-center" style="height: 50vh;">
                <span class="h4 text-muted">Nenhuma lista foi encontrada</span>
              </div>           
        </div>
          
    </div>


</template>

<script lang="ts">
import { defineComponent } from "vue";
import ILista from "@/interfaces/ILista";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../components/HeaderTemplate.vue"

    type Lista = {
    id: number;
    nomeLista: string;
    };

    export default defineComponent({
        name: "ListaUsuario",
        components:{
            Navbar,

        },
        
        data(){
            return{
                listas: [] as ILista[],
                
            }
        },
        setup() {
            async function getListas(componentInstance: any, email : any): Promise<void> {
               
                const token = Cookies.get("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                try {
                    const response = await axios.post(
                        "http://localhost:8080/lista/getlista-consumidor",
                        {
                            email: email,
                        },
                        { headers }
                    );

                    const listas: Lista[] = response.data.map((lista: any) => ({
                        id: lista.id,
                        nomeLista: lista.nomeLista,
                    }));
                    componentInstance.listas = listas;
                    console.log(componentInstance.listas);
                } catch (error) {
                    console.log("Erro:", error);
                }
            }


            return {
            getListas,
            };
        },
        created(){
            const email = Cookies.get("email")
            this.getListas(this, email)
            
        },
        methods:{
            carregarListaProdutos(id : string){
                Cookies.set('lista', id , {secure:true, httpOnly: false})
            }
        },
            
           
        
    })
</script>
    
<style scoped>
    button {
            display: inline-block;
            text-align: center;
            transition: all 0.5s;
            cursor: pointer;
            margin: 5px;
            color: whitesmoke;
        }
        button span { 
            cursor: pointer;
            display: inline-block;
            position: relative;
            transition: 0.5s;
        }
        button span:after {
            content: '\00bb';
            position: absolute;
            opacity: 0;
            top: 0;
            right: -20px;
            transition: 0.5s;
        }
        button:hover {
           color: white;
           opacity: 0.75;
        }
        button:hover span {
            padding-right: 25px;
        }
        button:hover span:after {
            opacity: 1;
            right: 0;
        }

</style>