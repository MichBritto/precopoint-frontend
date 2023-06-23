<template>
    
  <div class="cart bg-dark text-light" :style="showCart ? '' : 'height:20px;'">
      <div class="cart-bar " style="margin-top: -10px" >
          <button @click="toggleCart()" style="width: 300px; height: 17px; background-color: #ffc107; display: flex; align-items: center; justify-content: center;">
              <i :class="showCart ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-up'" style="color: #0c0c0c;"></i>
              <label style="margin-left: 5px;color:black">&nbsp;{{ showCart ? 'Esconder' : 'Carrinho' }}</label>
          </button>
            
            
      </div>
  
    <transition name="slide" mode="out-in">
      <div v-if="showCart" class="cart-content" key="cartContent">
        <h3 class="text-center fw-bold " style="margin-right: 3px;"><i class="fa-solid fa-cart-arrow-down" style="color: white;padding-bottom: 5px;"></i>&nbsp;Carrinho</h3>

        <div v-if="isCartEmpty" class="text-center">
          <p>O carrinho está vazio.</p>
        </div>

        <div v-else >
          <ul class="cart-items">
            <li v-for="item in cartItems" :key="item.id" class="cart-item ">
              <div class="item-details" style="margin-left:5px">
                <span class="fw-bold"><img  v-bind:src="item.imagem" width="30" height="30" >&nbsp;&nbsp;{{ item.produto }}</span>
                <p>Quantidade: {{ item.qtde }}</p>
              </div>
              <button @click="abrirModal(item)" class="btn btn-sm " style="margin-right:5px">
                  <i class="fa-solid fa-edit fa-xs" style="color: black;"></i>
              </button>
            </li>
          </ul>

          <button class="cart-summary text-center btn btn-dark btn-sm d-flex align-items-center justify-content-center" @click="abrirFinalizar" style="width: calc(100% - 40px); margin-left: 20px;">
              <i class="fa-solid fa-cart-plus" style="color: white;"></i><span style="margin-left: 5px;" >Finalizar</span>
          </button>

          
            
            
        </div>
      </div>
    </transition>
  </div>

  <div v-if="showModal" class="modal-overlay">
      <div class="card col-6 mx-auto">
          <div class="modal-content">
              <h5 class="card-title text-center">Atualização do Produto</h5>
              <form>
                  <!-- Produto -->
                   <!-- descricao -->  
                   <div class="mb-3 pt-3">  

                      
                      <table class="table table-bordered ">
                   
                          <thead class="table-dark text-center ">
                              <tr>
                                  <th scope="col">Imagem</th>
                                  <th scope="col">Produto</th>
                                  <th scope="col">Detalhe</th>
                                  <th scope="col">Quantidade</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr class="table-light table-hover text-center">
                                  <td ><img  v-bind:src="produtoAtual.imagem" width="30" height="30" ></td>
                                  <td style="align-items: left">{{ produtoAtual.produto }}</td>
                                  <td style="align-items: left">{{ produtoAtual.descricao }}</td>
                                  <td style="align-items: left">{{ produtoAtual.qtde }}</td>
                              </tr>  
                          </tbody>
                      </table>
                      <div class="d-flex justify-content-between pt-3" >
                          <button type="button" class="btn btn-dark" @click="closeModal()">Cancelar</button>
                          <div>
                              <button type="button" class="btn" @click="removeProduto()">-</button>
                              <input type="number"  class="text-center input-quantidade" v-model="quantidade"/>
                              <button type="button" class="btn" @click="addProduto()">+</button>
                          </div>
                          <div  style="display: flex; gap: 10px;">
                              <button type="button" class="btn btn-danger" @click.prevent="removeItem(produtoAtual)" >
                                <i class="fa-solid fa-trash fa-xs" style="color: white;padding-right:5px"></i>
                                Remover
                              </button>                         
                              <button type="button" class="btn btn-warning" @click.prevent="editarProduto(produtoAtual)">
                                Atualizar
                              </button>                             
                          </div>
                            
                          

                      </div>
                      
                  </div>
              </form>
          </div>
      </div>
  </div>

  <div v-if="showFinalizar" class="modal-overlay " >
      <div class="card col-6 mx-auto" >
          <div class="modal-content" >
              <h2 class="card-title text-center" style="color:#ffc107">Adicionar a Lista</h2>
              <form>
                  <!-- Produto -->
                  
                   <!-- descricao -->  
                   <div class="mb-3 pt-3">  
                      <ul class="cart-items">
                        <li v-for="lista in listas" :key="lista.id" class="cart-item" >
                          <div :class="{'input-group-text': true, 'checkbox-selected': selectedLists.includes(lista.id)}" style="width:100%">
                            <input type="checkbox" :value="lista.id" v-model="selectedLists" aria-label="Checkbox for following text input">
                            <label style="margin-left: 5px;">{{ lista.nomeLista }}</label>
                          </div>
                        </li>
                      </ul>
                      <div v-if="!listas.length" class="text-center" style="padding-top: 10rem;padding-bottom: 10rem;">
                          <h4>Você não tem nenhuma lista</h4>
                      </div>
                      

                      <button type="button" class="btn btn-dark float-start" @click="fecharFinalizar()">Cancelar</button>
                      <button type="button" class="btn btn-dark float-end" @click="adicionarALista()">Adicionar a Lista</button>
                      
                      
                    </div>
              </form>
          </div>
      </div>
  </div>
 
</template>

<script lang="ts">
  import api from '@/http';
  import IProduto from '@/interfaces/IProduto';
  import Cookies from 'js-cookie';
  import Swal from 'sweetalert2';
  import { defineComponent } from 'vue';
  
  interface listaUsuario {
      id: number,
      nomeLista: string,
      idConsumidor: number,
      consumidor: string
  }
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Cart",
  props: {
      produtoAdicionado: {
        type: Object,
        required: false
      },
      cartItems: {
        type: Array as ()=> IProduto[],
        required: true
      }
  },
  emits: ['removeProduto', 'limpaCarrinho'],
  data() {
    return {
      showCart: false,
      showModal: false,
      quantidade: 0,
      produtoAtual: {} as IProduto,
      showFinalizar: false,
      listas:[] as listaUsuario[], 
      selectedLists: [] as number []
    };
  },
  watch: {
  },
  methods: {
      removeItem(item : IProduto) : void {
          this.$emit('removeProduto', item)
          this.closeModal()
      },
      toggleCart(){
          this.showCart = !this.showCart
      },
      closeModal() {
          this.showModal = false;
          this.quantidade = 0
      },
      abrirModal(produto : IProduto){
          this.showModal = true
          this.quantidade = produto.qtde
          this.produtoAtual = produto
      },
      editarProduto(produtoAtual: IProduto){
          if(this.quantidade > 0){
              produtoAtual.qtde = this.quantidade
              Swal.fire({
                  title: 'Produto Atualizado',
                  text: 'Produto Atualizado com Sucesso!',
                  icon: 'success',
              });
              this.closeModal()
          }else{
              const aux = produtoAtual
              this.closeModal()
              Swal.fire({
                  title: 'Remover item?',
                  text: 'Deseja mesmo remover este item?',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  cancelButtonText: "Cancelar",
              }).then((result)=>{
                  if (result.isConfirmed) {
                    this.removeItem(produtoAtual)                 
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      this.abrirModal(aux)
                  }     
              })
          }
          
      },
      addProduto(){
          this.quantidade += 1
      },
      removeProduto(){
          this.quantidade -= 1
      },
      getListas(){   
              const token = Cookies.get("token")
              const headers = {
                  'Authorization': `Bearer ${token}`
              };
              if (token){
                  api.get("lista/getlista-consumidor/" + Cookies.get("email"),
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
      abrirFinalizar() {
          this.showFinalizar = true ;
          this.getListas()
          
          
      },
      fecharFinalizar(){
          this.showFinalizar = false
      },


      adicionarALista() {
          var erro = false
          if (this.selectedLists.length === 0) {
              // Exibe uma mensagem de erro ou executa outra ação desejada
              return;
          }

          const token = Cookies.get("token")
          const headers = {
              'Authorization': `Bearer ${token}`
          };
          if (token){
          for (let listaId of this.selectedLists) {
              
             this.cartItems.forEach(produto => {
              api.post("lista/addproduto", 
                  {
                      produtoId: produto.id,
                      listaId: listaId,
                      qtde: produto.qtde
                      
                  },
                  { headers }
                  )
                  .then()
                  .catch(error => {
                    erro = true
                    
                    Swal.fire({
                      icon: 'error',
                      title: 'Erro!',
                      text: 'Ocorreu um erro ao adicionar o produto à lista.',
                      timer: 2000, // opcional, tempo em milissegundos antes de fechar automaticamente
                      showConfirmButton: false
                    });
                  });
              });
              
                  
               
            }
            if (!erro){
              this.showFinalizar = false
              Swal.fire({
                  icon: 'success',
                  title: 'Sucesso!',
                  text: 'Produtos adicionados com sucesso.',
                  timer: 2000, // opcional, tempo em milissegundos antes de fechar automaticamente
                  showConfirmButton: false
                });
              this.$emit('limpaCarrinho')
            }else{
              this.showFinalizar = false
              Swal.fire({
                      icon: 'error',
                      title: 'Erro!',
                      text: 'Ocorreu um erro ao adicionar o produto à lista.',
                      timer: 2000, // opcional, tempo em milissegundos antes de fechar automaticamente
                      showConfirmButton: false
                    });
            }
          }  
          this.selectedLists = [];

      },


      
      
  },
  computed: {
    isCartEmpty(){
      return this.cartItems.length === 0
    }
  },
});
</script>

<style scoped>
/* Estilos CSS para o componente */
.cart {
  position: fixed;
  bottom: 0px;
  right: 20px;
  width: 300px;
  background-color: #E0E0E0
  ;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color:black;
  max-height: 500px;
  
}

.cart-bar {
display: flex;
justify-content: flex-end;
margin-bottom: 10px;
}

.cart-bar button {
padding: 5px 10px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 4px;
cursor: pointer;
}

.cart-bar button:hover {
background-color: #0056b3;
}

.cart-content {
max-height: 400px;
overflow-y: auto;
}

.cart-content h2 {
text-align: center;
scrollbar-width: thin;
}

.cart-items {
list-style-type: none;
padding: 0;
background-color: white;
border-radius: 5px;
border-color: #E0E0E0;
color: black;

}

.cart-item {
display: flex;
align-items: center;
justify-content: space-between;
}

.cart-summary {
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 20px;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
color: white;

}

.slide-enter-active {
transition: height 0.3s;
}

.slide-leave-active {
transition: height 0.3s;
}

.slide-enter,
.slide-leave-to {
height: 0;
opacity: 0;
overflow: hidden;
}

.slide-leave,
.slide-enter-to {
height: auto;
opacity: 1;
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
}
.cart-content::-webkit-scrollbar {
  width: 3px; /* Largura da barra de rolagem */
}

.cart-content::-webkit-scrollbar-track {
  background: transparent; /* Cor do fundo da barra de rolagem */
}

.cart-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3); /* Cor da barra de rolagem */
  border-radius: 4px; /* Raio da borda da barra de rolagem */
}

.cart-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5); /* Cor da barra de rolagem ao passar o mouse */
}
.input-group-text{
  background-color: #2b2d31;
  border:black;
  margin-bottom: 10px;
  color: white;
}

.checkbox-selected input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid black;
  border-radius: 4px;
  background-color: #fff;
  margin-right: 4px;
  vertical-align: middle;
}

.checkbox-selected input[type="checkbox"]:checked {
  background-color: black;
  background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="20 6 9 17 4 12"%3E%3C/polyline%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center;
}

</style>
