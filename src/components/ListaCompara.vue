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
        <tbody v-for="(lista, index) in listaComp" :key="index">
            <tr>
                <td>
                    <img src="../assets/user.png" style="width: 40px; height: 40px; margin-right: 10px;">
                    <p></p>
                    <span style="display: inline-block;" v-html="lista.fornecedor"></span>
                </td>
                <td style="text-align: right; vertical-align: middle;">
                    R$ {{ Number(lista.valor_total).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                    }) }}
                </td>
                <td style="text-align: center">
                    <ModalItens :itemsNaoEncontrados="lista.itens_nao_encontrados" :nomeFornec="lista.fornecedor" :id="'btnListaProduto'+index"/>
                </td>
            </tr>
        </tbody>
        
    </table>
</div>

</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import ModalItens from './ListaComparada.vue'
    export default defineComponent({
        name: "ListaCompara",
        components:{
            ModalItens
        },
        data(){
            return{
                listaComp: [{
                    fornecedor: "Empresa X",
                    valor_total: 200.50,
                    itens_nao_encontrados: ["item1", "item2", "item3"]
                },
                {
                    fornecedor: "Empresa Y",
                    valor_total: 350.50,
                    itens_nao_encontrados: ["item1", "item2", "item3"]
                }]
            }
        }        
        ,
        methods: {
           
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
</style>