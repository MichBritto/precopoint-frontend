<template >
    <!--Button Supplier-->
    <button type="button"  class="btn" data-bs-toggle="modal" :data-bs-target="'#' + id" style="border:none;background-color: transparent;" ><img src="https://th.bing.com/th/id/OIP.HnnTTBsKtoEr9vZ2xnf_eQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Texto alternativo" style="width: 40px; height: 40px; margin-right: 5px;" ></button>
    <!-- Modal - Fornecedor-->
    <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-xl modal-dialog-centered ">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <!--Button Close-->
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body align-center">
                            <h3 class="text-center mb-4">Itens não encontrados na lista {{ nomeFornec }}</h3>
                            <ul class="list-group">
                            <li class="list-group-item" v-for="(item, index) in itemsNaoEncontrados" :key="index">{{ item }}</li>
                            </ul>  

                        </div>
                        
                    </div>
                </div> 
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "ListaComparada",
        props: {
            itemsNaoEncontrados: {
                type: Array,
                default: () => []
            },
            nomeFornec: {
                type: String
            },
            id:{
                type: String
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