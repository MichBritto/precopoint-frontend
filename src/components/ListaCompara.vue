<template>
    <div class="table-responsive">
    <table class="table table-bordered table-limit">
        <thead class="table-dark">
            <tr>
                <th scope="col" style="width: 45%">Mercado</th>
                <th scope="col" style="width: 45%; word-wrap: break-word;">Valor Total</th>
                <th scope="col" style="width: 10%">Visualizar</th>
            </tr>
        </thead>
        <tbody v-for="(fornecedor, nome, index) in fornecedores" :key="nome">
            <tr>
                <td style="text-align: center; display: flex; flex-direction: column; align-items: center;" 
                    @click="loadList(nome as any)"
                    class="item-animation">
                    <img :src="fornecedor.logotipo || ''" style="width: 45px; height: 45px; margin-bottom: 5px;">
                    <span style="display: inline-block; text-transform: capitalize;">{{ nome }}</span>
                </td>   
                <td style="text-align: right; vertical-align: middle;">
                    R$ {{ Number(fornecedor.valorTotal).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                    }) }}
                </td>
                <td style="display: flex; justify-content: center; align-items: center;">
                <ModalItens  :itemsNaoEncontrados="produtos_nao_encontrados" :nomeFornec="(nome as string)" :id="'btnListaProduto'+ index"/>
                </td>

            </tr>
          </tbody>
          
        
    </table>
</div>

</template>
<script lang="ts">

    import { defineComponent } from 'vue';
    import ModalItens from './ListaResultados.vue'
    import Cookies from "js-cookie"
    import api from '@/http';

    
    interface FornecedoresComLogotipos {
        [fornecedor: string]: {
            valorTotal: number,
            logotipo: string | null
        }
    }
    export default defineComponent({
        name: "ListaCompara",
        emits:["loadFornec"],
        components:{
            ModalItens
        },
        data(){
            return{
                produtos_nao_encontrados: Object,
                fornecedores: {} as FornecedoresComLogotipos
            }
        },
        created(){
            this.getListas()
        },
        methods: {
            getListas(){
                try {
                const token = Cookies.get("token")
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                api.get('lista/getvalortotal/' + Cookies.get("lista"), { headers : headers })
                .then(response => {
                    const data = response.data;
                    

                    this.produtos_nao_encontrados = data["produtos-nao-encontrados"] //Separa os produtos nao encontrados
                    this.fornecedores = data["fornecedores"]

                })
                .catch(error => {
                    console.log('Erro:', error);
                });
                
        
                }
                catch{
                    console.log("Erro ao carregar lista.")
                }
            },
            fornecedorNomeFormatado(nome: string) {
                return nome.charAt(0).toUpperCase() + nome.slice(1);
            },
            loadList(fornecedor : string){
                
                this.$emit('loadFornec', fornecedor)
            }

        }
    })
</script>
<style scoped>
    .table-limit {
    max-width: 500px;
    }

    @media only screen and (max-width: 768px) {
    .table-limit {
        max-width: 100%;
    }
    .table-responsive {
        overflow-x: auto;
    }

    .table {
        width: 100%;
    }
    }
    .item-animation {
        cursor: pointer; /* Define o cursor como um ponteiro para indicar que o elemento é clicável */
        transition: background-color 0.3s; /* Adiciona uma transição suave para a cor de fundo */
      }
      
      .item-animation.clicked {
        background-color: lightgray; /* Altera a cor de fundo quando o item for clicado */
        box-shadow: 0 0 5px gray; /* Adiciona uma sombra quando o item for clicado */
      }
</style>