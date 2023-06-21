<template>
    <!--Button Consumer-->
    <button type="button" class="btn btn-primary shadow " data-bs-toggle="modal" data-bs-target="#btnConsumer"><i class="fa-solid fa-address-card"></i> Cadastrar Fornecedor</button>

    <!-- Modal - CONSUMIDOR-->
    <div class="modal fade" id="btnConsumer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <!--Button Close-->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <!--Form CONSUMIDOR-->
                <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <!-- Text -->
                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Cadastre-se aqui!</p>
                        <!-- Form -->
                        <form class="mx-1 mx-md-4" @submit.prevent="criarFornecedor()">
                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input type="text" id="nomeUsuario" class="form-control" v-model="v$.nomeUsuario.$model" :class="{'is-invalid': v$.nomeUsuario.$errors.length}" placeholder="Nome de usuário..." />
                                    <label  v-if="v$.nomeUsuario.$errors.length === 0" class="form-label text-left" for="nomeUsuario">Nome de usuário</label>
                                    <div class="text-danger mt-1" v-for="error in v$.nomeUsuario.$errors" :key="error.$uid">
                                        <span> • {{ error.$message }}</span>
                                    </div>
                                </div>
                            </div>
                
                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input type="email" id="email" class="form-control" v-model="v$.email.$model" :class="{'is-invalid': v$.email.$errors.length}" placeholder="E-mail..."/>
                                    <label v-if="v$.email.$errors.length === 0" class="form-label" for="email">E-mail</label>
                                    <div class="text-danger mt-1" v-for="error in v$.email.$errors" :key="error.$uid">
                                        <span> • {{ error.$message }}</span>
                                    </div>
                                </div>
                            </div>
                
                            <div class="d-flex flex-row align-items-center mb-4 icon-input" >
                                <i class="fa-sharp fa-solid fa-location-dot fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input type="tel" id="endereco" class="form-control" v-model="v$.endereco.$model" :class="{'is-invalid' : v$.endereco.$errors.length}" placeholder="CEP..." />
                                    <label class="form-label" for="endereco">CEP (não obrigatório)</label>
                                    <div class="text-danger mt-1" v-for="error in v$.endereco.$errors" :key="error.$uid">
                                        <span> • {{ error.$message }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4 icon-input" >
                                <i class="fa-solid fa-folder-open fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input type="tel" id="cnpj" class="form-control" v-model="v$.cnpj.$model" :class="{'is-invalid' : v$.cnpj.$errors.length}" placeholder="cnpj (somente números)..." />
                                    <label class="form-label" for="cnpj">Cnpj</label>
                                    <div class="text-danger mt-1" v-for="error in v$.cnpj.$errors" :key="error.$uid">
                                        <span> • {{ error.$message }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="d-flex flex-row align-items-center mb-4 icon-input" >
                                <i class="fa-solid fa-image fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input v-model="v$.logotipo.$model" :class="{'is-invalid' : v$.logotipo.$errors.length}" type="text"  class="form-control" id="logotipo" placeholder="Insira a URL da logo para sua empresa...">
                                    <label class="form-label" for="logotipo">Logotipo</label>
                                    <div class="text-danger mt-1" v-for="error in v$.logotipo.$errors" :key="error.$uid">
                                        <span> • {{ error.$message }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input type="password" id="senha" class="form-control" v-model="v$.senha.$model" :class="{'is-invalid': v$.senha.$errors.length}" placeholder="Senha..." />
                                    <label v-if="v$.senha.$errors.length === 0" class="form-label" for="senha">Senha</label>
                                    <div class="text-danger mt-1" v-for="error in v$.senha.$errors" :key="error.$uid">
                                        <span> • {{ error.$message }}</span>
                                    </div>
                                </div>
                            </div>
                
                            <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input type="password" id="rsenha" class="form-control" v-model="v$.rsenha.$model" :class="{'is-invalid': v$.rsenha.$errors.length}" placeholder="Confirmar Senha..."/>
                                    <label  v-if="v$.rsenha.$errors.length === 0" class="form-label" for="rsenha">Confirmar Senha</label>
                                    <div class="text-danger mt-1" v-for="error in v$.rsenha.$errors" :key="error.$uid">
                                        <span> • {{ error.$message }}</span>
                                    </div>
                                </div>
                            </div>
                
                            <div class="form-check d-flex justify-content-center mb-5">
                                <input class="form-check-input me-2" type="checkbox" value="" id="termosUso" v-model="agreement"/>
                                <label class="form-check-label" for="termosUso">
                                    Concordo com os <a href="#!" @click="callLiTermos()">Termos de uso</a>
                                </label>
                            </div>
                
                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="button" class="btn btn-primary btn-lg shadow" @click="criarFornecedor()">Registrar</button>
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
    <!--Termos de aceite-->
    <div v-if="callModal" class="modal-overlay ">
        <div class="card col-6 mx-auto text-center" style="background-color: #EFEBE9">
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
import passwordValidator from 'password-validator';
import Swal from 'sweetalert2'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { defineComponent } from 'vue';


export default defineComponent({
name: "RegUsuario",
data(){
    return{
        nomeUsuario: "",
        email: "",
        endereco:"",
        senha:"",
        rsenha:"",
        cnpj:"",
        logotipo:"",
        agreement: false,
        callModal: false,
    }
    
}, 
setup() {
    return { v$: useVuelidate() };
},
validations() {
    return {
        nomeUsuario: {
            required: helpers.withMessage('Campo obrigatório', required),
        },
        email: {
            required: helpers.withMessage('Campo obrigatório', required),
            email: helpers.withMessage('E-mail inválido',email)
        },
        senha: {
            required: helpers.withMessage('Campo obrigatório', required),
        },
        rsenha: {
            required: helpers.withMessage('Campo obrigatório', required),
        },
        endereco: {
            required: helpers.withMessage('Campo obrigatório', required),
        },
        cnpj: {
            required: helpers.withMessage('Campo obrigatório', required),
        },
        logotipo: {
            required: helpers.withMessage('Campo obrigatório', required),
        }
    }
},
created(){
    this.clear()
},
methods:{
    clear(){
        this.nomeUsuario= ""
        this.email= ""
        this.endereco=""
        this.senha=""
        this.rsenha=""
        this.cnpj=""
        this.agreement= false
    },
    async criarFornecedor(){
        if (this.agreement){
            if(!this.validarCampos()){
                Swal.fire({
                    title: 'Ops... existem campos em branco!',
                    text: "Preencha todos os campos requeridos para prosseguir.",
                    icon: 'warning',
                })
                return
            }
            if(!this.validarEmail()){
                Swal.fire({
                    title: 'Ops... este e-mail é inválido!',
                    text: "Para prosseguir você deve inserir um e-mail com formato válido.",
                    icon: 'warning',
                })
            }
            if(this.senha == this.rsenha){
                if(!this.validadorSenha(this.senha)){
                    Swal.fire({
                        title: 'Ops... revise sua senha!',
                        html: 'Para garantir a segurança de sua conta, precisamos que você siga este modelo:<ul><li>Ao menos 8 caractéres</li><li>Ao menos uma letra minúscula</li><li>Ao menos uma letra maiúscula</li><li>Ao menos um caractere especial: #,$,% etc.</li><li>Ao menos um número</li></ul>',
                        icon: 'warning',
                    })
                    return
                }
                await api.post('cadastro/fornecedor',
                {
                    nome: this.nomeUsuario,
                    email: this.email,
                    senha: this.senha,
                    endereco: this.endereco,
                    cnpj:this.cnpj,
                    logotipo:this.logotipo,
                },
                {
                    headers: {
                        
                    }
                })
                .then(() => {
                    this.atualizacaoBemSucedida()
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        Swal.fire({
                            title: 'Ops... preencha todos os campos requeridos!',
                            text: 'Para prosseguir você precisa preencher todos os campos solicitados',
                            icon: 'error',
                        })
                    } else if(error.response && error.response.status === 404){
                        Swal.fire({
                            title: 'Ops... o servidor está fora do ar momentaneamente!',
                            text: 'Pedimos desculpa, o servidor esta fora de serviço agora, por favor, tente novamente mais tarde. Obrigado! :)',
                            icon: 'error',
                        })
                    } else {
                        Swal.fire({
                            title: 'Ops... um erro inesperado ocorreu!',
                            text: "Este erro aconteceu: '"+ error.message +"', se o erro persistir entre em contato conosco.",
                            icon: 'error',
                        })
                    }
                })
            }else{
                Swal.fire({
                    title: 'Ops... revise sua senha!',
                    text:"Os campos 'Senha' e 'Repetir Senha' não correspondem",
                    icon: 'error',
                })
                return
            }
            
        }else{
            Swal.fire({
                title: 'Ops... Revise os termos de uso!',
                text:"Para prosseguir você precisa aceitar nossos termos de uso...",
                icon: 'info',
            })
            return
        }
    },
    atualizacaoBemSucedida(){
        Swal.fire({
            title: 'Cadastro realizado com sucesso!',
            text:"Bem-vindo(a) "+ this.nomeUsuario +", vá para a tela de login e efetue-o para aproveitar os recursos do PreçoPoint!",
            icon: 'success',
        })
        this.nomeUsuario = ""
        this.email = ""
        this.senha = ""
        this.rsenha = ""
        this.endereco = ""
        this.agreement = false
    },
    callLiTermos() {      
        if(this.callModal)
            this.callModal = false;
        else{
            this.callModal = true; 
        }       
    },
    validadorSenha(senha:string): boolean {
        const passwordSchema = new passwordValidator()
        passwordSchema
            .is().min(8)                                 // Mínimo de 8 caracteres
            .has().uppercase()                           // Deve ter letras maiúsculas
            .has().lowercase()                           // Deve ter letras minúsculas
            .has().digits()                              // Deve ter números
            .has().symbols();                            // Deve ter caracteres especiais
        return passwordSchema.validate(senha) as boolean;
    },
    validarCampos(): boolean{
        if(this.nomeUsuario.trim() === "" || this.email.trim() === "" || this.senha.trim() === ""  || 
            this.rsenha.trim() === "" || this.cnpj.trim() === "" || this.logotipo.trim() === "" || this.endereco.trim() === ""){
            return false
        }
        return true
    },
    validarEmail(): boolean {
        if(this.v$.email.$errors.length){
            return false
        }
        return true
    }
}
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
.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index: 9999;
}

.modal-content {
background-color: #fff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
padding: 20px;
height: 50%;
width: 50%;
}
.hand-cursor {
cursor: pointer;
}
.text-left {
text-align: left !important;
}
</style>