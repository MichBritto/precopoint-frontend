<template>
    <!--Button Supplier-->
    <button type="button" class="btn btn-danger shadow btn-sm" style="margin-left:2px" data-bs-toggle="modal" data-bs-target="#btnSupplier">Empresa</button>
    <!-- Modal - Fornecedor-->
    <div class="modal fade" id="btnSupplier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <!--Button Close-->
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <!--Form Fornecedor-->
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">   
                                        <!--Text-->           
                                        <P class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up at <span class="h2 text-danger fw-bold">Preço Point</span></P>
                                        <!--form-->
                                        <form class="mx-1 mx-md-4">
                                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example35c" class="form-control" v-model="empresa"  />
                                                    <label class="form-label" for="form3Example35c" > Nome da Empresa</label>
                                                </div>
                                            </div>
                        
                                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example34c" class="form-control" v-model="endereco" />
                                                    <label class="form-label" for="form3Example34c">Endereço</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="tel" id="form3Example33c" class="form-control" v-model="cnpj" />
                                                    <label class="form-label" for="form3Example33c">CPNJ</label>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>                                                                                                                                        
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="tel" id="form3Example73c" class="form-control" v-model="email"/>
                                                    <label class="form-label" for="form3Example73c">Email</label>
                                                </div>
                                            </div>
                                            

                                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example6c" class="form-control" v-model="senha" />
                                                    <label class="form-label" for="form3Example6c">Senha</label>
                                                </div>
                                            </div>
                        
                                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example43cd" class="form-control" v-model="rsenha" />
                                                    <label class="form-label" for="form3Example43cd">Repetir Senha</label>
                                                </div>
                                            </div>
                                            <!--
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="file" class="custom-file-input" id="inputGroupFile03" @change="handleFileChange">
                                                    <label class="custom-file-label" for="inputGroupFile03"></label>
                                                </div>
                                            </div>
                                            -->
                                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                                
                                                <i class="fa-regular fa-image fa-lg me-3 fa-fw" style="color: #000000;"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="url" id="form3Example7cd" class="form-control" v-model="path" />
                                                    <label class="form-label" for="form3Example7cd" placeholder="Adicione um link">Logo da Empresa</label>
                                                </div>
                                            </div>
                                            
                                            
                                            
                                            
                        
                                            <div class="form-check d-flex justify-content-center mb-5">
                                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example4c" v-model="agreement" />
                                                <label class="form-check-label">
                                                    Concordo com os <a href="#!">Termos de Serviço</a>
                                                </label>
                                            </div>
                        
                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" class="btn btn-primary btn-lg shadow" @submit.prevent="cadastrar">Registrar</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="@/assets/Queue-amico.svg" class="img-fluid" alt="Sample image">
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>   
            </div>
</template>

<script lang="ts">  
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: "RegFornecedor",
        data(){
            return{
                empresa: "",
                endereco: "",
                cnpj:"",
                email: "",
                senha: "",
                rsenha:"",
                agreement: false,
                path:""

            }
        },
        created() {
            this.clear()
        },
        methods:{
            clear(){
                this.empresa= ""
                this.endereco= ""
                this.cnpj=""
                this.email= ""
                this.senha= ""
                this.rsenha=""
                this.agreement= false
                this.path= ""
            },
            handleFileChange(event: any) {
                const file = event.target.files[0];
                // Faça o que for necessário com o arquivo selecionado
                console.log(file)
            },
            cadastrar(){
                console.log("Registro")
            }
        }
    })
</script>

<style>
    .icon-input i {
        margin-top: -35px; /* Adjust this value to move the icons up or down */
    }
</style>