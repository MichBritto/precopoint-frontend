<template>
    <!--Button Supplier-->
    <button type="button" class="btn btn-danger shadow "  data-bs-toggle="modal" data-bs-target="#btnSupplier">Cadastrar Fornecedor</button>
    <!-- Modal - Fornecedor-->
    <div class="modal fade" id="btnSupplier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
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
                                        <form class="mx-1 mx-md-4" @submit.prevent="criarFornecedor">
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
                                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example4c"  v-model="agreement" />
                                                <label class="form-check-label">
                                                    Concordo com os <a href="#!" @click="callLiTermos">Termos de Serviço</a>
                                                </label>
                                            </div>
                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" class="btn btn-primary btn-lg shadow" @click="criarFornecedor">Registrar</button>
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


<div v-if="callModal" class="modal-overlay ">
    <div class="card col-6 mx-auto" style="background-color: #EFEBE9">
            <h1 class="text-warning" >TERMO DE USO - EMPRESA</h1>
            <div class="card-body modal-dialog-scrollable" style="max-height: 600px; overflow-y: auto;">
                <p class="mb-3 mt-2">Este Termo de Uso ("Termo") estabelece os termos e condições aplicáveis ao uso da nossa Plataforma de comparação de produtos de supermercado ("Plataforma") pelo fornecedor. Leia atentamente este Termo antes de utilizar nossa Plataforma. Ao utilizar nossa Plataforma, você concorda em cumprir e ficar vinculado a este Termo.</p>

                <h2 >Serviços Prestados</h2>
                <p >A nossa Plataforma permite que você, fornecedor, cadastre sua empresa e disponibilize informações sobre seus produtos para que os clientes possam compará-los. A Plataforma também permite que você atualize e gerencie essas informações.</p>

                <h2 >Cadastro do Fornecedor</h2>
                <p>Para utilizar nossa Plataforma como fornecedor, é necessário realizar um cadastro fornecendo as seguintes informações: nome da empresa, e-mail, endereço, CNPJ e logotipo. As informações fornecidas devem ser precisas, completas e atualizadas. Você é responsável por manter a confidencialidade dos seus dados de acesso e por todas as atividades realizadas em sua conta.</p>

                <h2 >Propriedade Intelectual</h2>
                <p>A Plataforma, incluindo todo o seu conteúdo e funcionalidades, é de propriedade da nossa empresa e está protegida por leis de direitos autorais e outras leis de propriedade intelectual. Você concorda em não reproduzir, distribuir, modificar, criar obras derivadas, exibir publicamente, realizar engenharia reversa ou utilizar de qualquer outra forma o conteúdo da Plataforma, exceto conforme expressamente permitido por nós.</p>

                <h2 >Responsabilidade pelo Conteúdo</h2>
                <p >Você é o único responsável por todas as informações fornecidas por meio da Plataforma, incluindo informações sobre seus produtos. Você declara e garante que possui todos os direitos necessários para fornecer essas informações e que elas não violam direitos de terceiros.</p>

                <h2 >Privacidade</h2>
                <p >Respeitamos sua privacidade e tratamos seus dados pessoais de acordo com nossa Política de Privacidade. Ao utilizar nossa Plataforma, você consente com a coleta, uso e divulgação de suas informações pessoais de acordo com nossa Política de Privacidade.</p>

                <h2 >Rescisão</h2>
                <p >Podemos rescindir ou suspender seu acesso à Plataforma a qualquer momento, por qualquer motivo, sem aviso prévio ou responsabilidade.</p>

                <h2 >Disposições Gerais</h2>
                <p >Este Termo constitui o acordo integral entre você e nossa empresa em relação ao uso da Plataforma. A falha em exercer ou aplicar qualquer direito ou disposição deste Termo não constituirá uma renúncia a tal direito ou disposição. Se alguma disposição deste Termo for considerada inválida ou inexequível, as demais disposições permanecerão em vigor.</p>

            </div>
            <button type="button" class="btn btn-warning btn-sm mx-auto mt-1" @click="callModal=false" >&nbsp;<i class="fa-solid fa-chevron-left " ></i>&nbsp;&nbsp;Voltar&nbsp;&nbsp;</button>
        </div>
    </div>

</template>

<script lang="ts">  
    import api from '@/http';
import Cookies from 'js-cookie';
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
                path:"",
                callModal: false

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
            async criarFornecedor(){
                if (this.agreement){
                    
                    const body = {
                        nome: this.empresa,
                        email: this.email,
                        senha: this.senha,
                        endereco: this.endereco,
                        cnpj: this.cnpj,
                        logotipo: this.path
                    }
                    console.log(body)
                    if(this.senha == this.rsenha){
                        await api.post('cadastro/fornecedor',
                        body,
                        {
                            headers : {
                                Authorization: `Bearer ${Cookies.get("token")}`
                            }
                        })
                        .then((response) => {
                            console.log(response.data)
                            this.atualizacaoBemSucedida()
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 400) {
                            // Ocorreu um erro de Bad Request (400)
                                const errorData = error.response.data;
                                if (Array.isArray(errorData) && errorData.length > 0) {
                                    let errorMessage = 'Os seguintes campos devem ser preenchidos:';
                                    errorData.forEach((errorItem) => {
                                        const field = errorItem.field;
                                        const errorMessageItem = errorItem.errorMessage;
                                        errorMessage += '\n- O ' + field + ' ' + errorMessageItem;
                                    });

                                    alert(errorMessage);
                                } else {
                                    console.log('Erro de Bad Request (400):', errorData.errorMessage);
                                }
                            } else {
                                // Outro tipo de erro ocorreu
                                console.log('Erro:', error.message);
                            }
                        })
                    }else{
                        alert('As senhas devem ser iguais')
                    }
                    
                }else{
                    alert('Necessario aceitar os termos de uso.')
                }
            },
            atualizacaoBemSucedida(){
                this.empresa= ''
                this.email= ''
                this.senha= ''
                this.endereco= ''
                this.cnpj= ''
                this.path= ''
                this.agreement = false
                alert('Fornecedor cadastrado com sucesso!');
            },
            callLiTermos(){
                if(this.callModal)
                    this.callModal = false;
                else{
                    this.callModal = true; 
                }       
            }
        },
        
    })
</script>

<style>
    .icon-input i {
        margin-top: -35px; /* Adjust this value to move the icons up or down */
    }
    .modal-body h1 {
        margin-top: 2rem;
      }
    .modal-body h2 {
    margin-top: 2rem;
    }
    .modal-body p {
    margin-bottom: 2rem;
    }
</style>