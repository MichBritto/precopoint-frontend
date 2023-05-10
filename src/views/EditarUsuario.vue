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
              <label for="inputName" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input v-model="name" type="text" class="form-control" id="inputName" placeholder="Place Your Name">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="inputEndereco" class="col-sm-2 col-form-label">Address</label>
              <div class="col-sm-10">
                <input v-model="endereco" type="text" class="form-control" id="inputEndereco" placeholder="Place Your Address">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="staticEmail" value="email@example.com">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Place your Password">
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="inputRPassword" class="col-sm-2 col-form-label">Repeat Your Password</label>
              <div class="col-sm-10">
                <input v-model="rpassword" type="password" class="form-control" id="inputRPassword" placeholder="Repeat Your Password">
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-lg text-center">
            <button @click="salvar" type="button" class="btn btn-outline-success btn-block mb-2 mt-4 justify-content-sm-between">Salvar</button>
            <button type="button" class="btn btn-outline-danger btn-block mb-2 mt-4 justify-content-sm-between" style="margin-left:4px;">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import Navbar from "@/components/HeaderTemplate.vue";
    import { defineComponent } from "vue";
  
    export default defineComponent({
        name: "EditarUsuario",
        components: {
            Navbar,
        },
        data() {
        return {
            name: "",
            endereco: "",
            password: "",
            rpassword: "",
            };
        },
        methods: {
            async salvar() {
                const id = this.$route.params.id; // obtém o ID do usuário da rota
                const data = { // cria o objeto com os dados atualizados do usuário
                    name: this.name,
                    address: this.endereco,
                    password: this.password
                };

                try {
                    const response = await fetch(`http://localhost:8080/editar-usuario/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    })                  
                    
                    alert(await response.json());
                } catch (error) {
                    console.log(error); // exibe o erro no console
                    // exibe uma mensagem de erro para o usuário
                    alert("Erro ao atualizar os dados do usuário!");
                }
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
