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
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        <div class="row">
          <form>
            <div class="form-group row mt-2">
              <label for="nome" class="col-sm-2 col-form-label">Nome</label>
              <div class="col-sm-10">
                <input v-model="nome" type="text" class="form-control" id="nome" placeholder="Insira um nome para sua empresa...">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="cep" class="col-sm-2 col-form-label">CEP</label>
              <div class="col-sm-10">
                <input v-model="cep" type="text" class="form-control" id="cep" placeholder="Insira seu CEP...">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="email" class="col-sm-2 col-form-label">E-mail</label>
              <div class="col-sm-10">
                <input v-model="email" type="text" readonly class="form-control" id="email" disabled>
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="logotipo" class="col-sm-2 col-form-label">Logotipo</label>
              <div class="col-sm-10">
                <input v-model="logotipo" type="text" readonly class="form-control" id="logotipo" placeholder="Insira a URL da logo para sua empresa...">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="senha" class="col-sm-2 col-form-label">Senha</label>
              <div class="col-sm-10">
                <input v-model="senha" type="password" class="form-control" id="senha" placeholder="Place your Password">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="confirmarSenha" class="col-sm-2 col-form-label">Repita sua senha</label>
              <div class="col-sm-10">
                <input v-model="confirmarSenha" type="password" class="form-control" id="confirmarSenha" placeholder="Repeat Your Password">
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-lg text-center">
            <button @click="atualizarUsuario()" type="button" class="btn btn-outline-success btn-block mb-2 mt-4 justify-content-sm-between">Atualizar</button>
            <button @click="cancelarAtualizacao()" class="btn btn-outline-danger btn-block mb-2 mt-4 justify-content-sm-between" style="margin-left:4px;">Cancelar</button>
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
    import { defineComponent } from "vue";
  
    export default defineComponent({
        name: "EditarFornecedor",
        components: {
            Navbar,
        },
        data() {
        return {
            email:'',
            nome: '',
            cep: '',
            logotipo: '',
            senha: '',
            confirmarSenha:'',
            statusConta: true,
            };
        },
        mounted(){
          
          this.carregarUsuario();
        },
        methods: {
            async carregarUsuario() {
                await api.get('fornecedor/get/'+this.email,
                {
                  headers: {
                    Authorization: 'Bearer '+Cookies.get('token')
                  }
                })
                .then((response) => {
                  this.nome = response.data.nome;
                  this.email = Cookies.get('email') as string;
                  this.logotipo = response.data.logotipo;
                  this.cep = response.data.cep;           
                })
                .catch((error) => {
                  alert(error.response.data.message)
                })
            },
            async atualizarUsuario() {
              await api.put('fornecedor/update',
              {
                email:this.email,
                nome: this.nome,
                endereco: this.cep,
                senha: this.senha
              },
              {
                headers: {
                  Authorization: 'Bearer '+Cookies.get('token')
                }
              })
              .then((response) => {
                alert('Dados atualizados com sucesso.')
              })
              .catch((error) => {
                if(error.response.status === 403){
                  alert("Você não está autorizado")
                }
                else{
                  alert("Um erro aconteceu, tente novamente.")
                }
              })
            },
            cancelarAtualizacao() {
              router.push('/')
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
