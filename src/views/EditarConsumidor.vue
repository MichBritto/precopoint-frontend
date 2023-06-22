<template>
  <Navbar></Navbar>
  <div class="row">
    <div class="col">
      <div class="d-flex justify-content-between mt-4 mb-4">
        <p></p>
        <div class="text-center mx-auto text-uppercase">
          <span class="h1 text-warning fw-bold">Editar Perfil</span>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <!--Icone duvida-->
  <div class="container">
    <a href="#">
      <i class="fa-sharp fa-regular fa-circle-question shadow fa-lg " @click="alertDuvida"></i>
    </a>
  </div>
  <div class="row">
    <div class="col-lg-2"></div>
    <div class="col-lg-8">
      <div class="row">
        <form>
          <div class="form-group row mt-2">
            <label for="nome" class="col-sm-2 col-form-label"><i class="fa-solid fa-user"></i> Nome</label>
            <div class="col-sm-10">
              <input v-model="v$.nome.$model" :class="{'is-invalid' : v$.nome.$errors.length}" type="text" class="form-control" id="nome" placeholder="Digite seu nome social...">
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="cep" class="col-sm-2 col-form-label"><i class="fa-solid fa-location-dot"></i> CEP</label>
            <div class="col-sm-10">
              <input v-model="v$.cep.$model" :class="{'is-invalid' : v$.cep.$errors.length}" type="text" class="form-control" id="cep" placeholder="Insira seu CEP...">
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="email" class="col-sm-2 col-form-label"><i class="fa-solid fa-envelope"></i> E-mail</label>
            <div class="col-sm-10">
              <input v-model="email" type="text" readonly class="form-control" id="email" disabled>
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="senha" class="col-sm-2 col-form-label"><i class="fa-solid fa-key"></i> Alterar senha</label>
            <div class="col-sm-10">
              <button @click="enviarEmailRecuperacaoSenha()"  type="button" class="btn btn-outline-primary btn-block justify-content-sm-between">Enviar e-mail para redefinir senha <i class="fa-solid fa-paper-plane"></i></button>
            </div>
          </div>
        </form>
      </div>
      <div class="row">
        <div class="col-lg text-center">
          <button @click="atualizarUsuario()" type="button" class="btn btn-outline-success btn-block mb-2 mt-4 justify-content-sm-between">Atualizar <i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
          <button @click="cancelarAtualizacao()" class="btn btn-outline-danger btn-block mb-2 mt-4 justify-content-sm-between" style="margin-left:4px;">Cancelar <i class="fa-solid fa-ban"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import Navbar from "@/components/HeaderTemplate.vue";
import api from "@/http";
import router from "@/router";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import passwordValidator from 'password-validator'
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditarUsuario",
  components: {
      Navbar,
  },
  data() {
  return {
      email:'',
      nome: '',
      cep: '',
      statusConta: true,
      };
  },
  setup() {
      return { v$: useVuelidate() };
  },
  validations() {
      return {
          email: {
              required: helpers.withMessage('Campo obrigatório', required),
              email: helpers.withMessage('E-mail inválido',email)
          },
          nome: {
              required: helpers.withMessage('Campo obrigatório', required),
          },
          cep: {
              required: helpers.withMessage('Campo obrigatório', required),
          },     
      }
  },
  mounted(){
    this.email = Cookies.get('email') as string;
    this.carregarUsuario();
  },
  methods: {
      async carregarUsuario() {
          await api.get('consumidor/get/'+this.email,
          {
            headers: {
              Authorization: 'Bearer '+Cookies.get('token')
            }
          })
          .then((response) => {
            this.nome = response.data.nome;
            this.cep = response.data.cep;
          })
          .catch((error) => {
            Swal.fire({
              title: 'Erro ao carregar dados',
              text: 'Um erro ocorreu: '+ error.response.data.message +', tente novamnete em instantes. Se o erro persistir entre em contato conosco.',
              icon: 'error',
            });
          })
      },
      async atualizarUsuario() {
        await api.put('consumidor/update',
        {
          email:this.email,
          nome: this.nome,
          endereco: this.cep,
        },
        {
          headers: {
            Authorization: 'Bearer '+Cookies.get('token')
          }
        })
        .then(() => {
          Swal.fire({
              title: 'Atualização realizada com sucesso',
              text: 'Os dados foram atualizados',
              icon: 'success',
          });
          this.carregarUsuario();
        })
        .catch(() => {
          Swal.fire({
              title: 'Falha ao atualizar dados',
              text: 'Um erro ocorreu ao atualizar seus dados, tente novamente ou entre em contato conosco',
              icon: 'error',
          });
        })
      },
      cancelarAtualizacao() {
        router.push('/')
      },
      alertDuvida(){
        Swal.fire({
            title: 'Atualizações de dados',
            text: 'Os campos não são obrigátorios, mas fique atento! Caso exista algum campo em branco no momento da atualização, não se preocupe, ele permanecerá com o mesmo dado que havia antes. Porém, se ele estiver preenchido com algum caractere, este campo será atualizado junto aos outros.',
            icon: 'info',
        });
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
      async enviarEmailRecuperacaoSenha() {
        Swal.fire({
          title: 'Aguarde...',
          text: 'Estamos te enviando um e-mail para redefinir sua senha',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
              Swal.showLoading();
              api.get('email/enviar-recuperacao-senha/'+ this.email)
              .then(() => {
                  Cookies.set('emailRedefinicao',this.email);
                  console.log(Cookies.get('emailRedefinicao'))
                  Swal.close();
                  setTimeout(() => {
                      Swal.fire({
                          title: 'E-mail de redefinição enviado!',
                          text: "Um e-mail de redefinição de senha foi enviado para: " + Cookies.get('emailRedefinicao') +", acesse e redefina sua senha!",
                          icon: 'success',
                      });
                  },500)
              })
              .catch((error) => {
                  Swal.fire({
                      title: 'Ops... erro ao enviar e-mail',
                      text: 'Um erro aconteceu ao tentar enviar e-mail, erro: ' + error.response.data.errorMessage,
                      icon: 'error',
                  });
              })
          }
        })
      }
  },
});
</script>

<style scoped>
    label{
        font-weight:600;

    }
    button{
        padding-left:5rem;
        padding-right:5rem;
    }    
</style>
