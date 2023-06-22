<template >
  <!--Button Supplier-->
  <button type="button"  class="btn" data-bs-toggle="modal" :data-bs-target="'#' + id" style="border:none;background-color: transparent;"><i class="fa-solid fa-eye"></i></button>
  <!-- Modal - Fornecedor-->
  <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-xl modal-dialog-centered ">
                  <div class="modal-content">
                      <div class="modal-header border-0">
                          <!--Button Close-->
                      </div>
                      <div class="modal-body align-center border-0 " style="margin-top: -2em; ">
                          <h3 class="text-center mb-4">Produtos não encontrados no {{ fornecedor(nomeFornec) }}</h3>
                          <ul class="list-group text-center" v-if="nao_encontrados.length > 0">
                            <li  class="list-group-item" v-for="(item, index) in nao_encontrados" :key="index">{{ item }}</li>
                          </ul>  
                          <ul class="list-group text-center" v-if="nao_encontrados.length <= 0">
                            <li  class="list-group-item">Nenhum</li>
                          </ul>  
                      </div>
                      
                  </div>
              </div> 
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
 

  export default defineComponent({
      name: "ListaResultados",
      props: {
          itemsNaoEncontrados: {
              type: Object 
          },
          nomeFornec: {
              type: String,
              required: true
          },
          id:{
              type: String
          }
      },
      data(){
        return{
          
          foundProducts: false,
          nao_encontrados: [] as string[]
        }
      },
      created(){
        this.geraLista()
      },
      methods:{
        geraLista() {

          
        const listaItens = this.itemsNaoEncontrados
        if (listaItens != null) {
          const nomeFornecLowerCase = this.nomeFornec.toLowerCase();
          Object.keys(listaItens).forEach(empresa => {
            if (empresa.toLowerCase() === nomeFornecLowerCase) {
              this.foundProducts = true;
              const produtos = listaItens[empresa as any];
              produtos.forEach((element: string) => {
                if (this.nao_encontrados.indexOf(element) === -1) {
                    this.nao_encontrados.push(element)
                }
              });
              return
            }
            else{
              this.foundProducts = false;
            }
          });
        }
        
      },
      fornecedor(str : string) : string{
          return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  })
       
</script>
<style scoped>
h3 {
font-size: 24px;
font-weight: bold;
}

.list-group {
max-width: 400px;
margin: 0 auto;
}

.list-group-item {
font-size: 18px;
padding: 10px 15px;
border-color: #dee2e6;
}

.list-group-item:first-child {
border-top-left-radius: 0.25rem;
border-top-right-radius: 0.25rem;
}

.list-group-item:last-child {
border-bottom-left-radius: 0.25rem;
border-bottom-right-radius: 0.25rem;
}

.list-group-item:not(:last-child) {
border-bottom: 1px solid #dee2e6;
}

@media (max-width: 576px) {
.list-group {
  max-width: 100%;
}
}
</style>