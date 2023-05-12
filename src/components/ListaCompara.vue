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
        <tbody v-for="(fornecedor, index) in fornecedores" :key="index">
            <tr>
              <td>
                <img :src="fornecedor.logotipo || ''" style="width: 40px; height: 40px; margin-right: 10px;">
                <p></p>
                <span style="display: inline-block;">{{ fornecedor.fornecedor }}</span>
              </td>
              <td style="text-align: right; vertical-align: middle;">
                R$ {{ Number(fornecedor.preco).toLocaleString('pt-BR', {
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
    import ModalItens from './ListaResultados.vue'
    import Cookies from "js-cookie"
    import api from '@/http';

    interface Fornecedores {
    [key: string]: number;
    }

    interface FornecedorLogotipo {
    [key: string]: string;
    }

    interface ProdutosNaoEncontrados {
    [key: string]: string[];
    }
    interface DadosJson {
        fornecedores: Fornecedores;
        "fornecedor-logotipo": FornecedorLogotipo;
        "produtos-nao-encontrados": ProdutosNaoEncontrados;
    }
    interface FornecedoresComLogotipos {
        [fornecedor: string]: {
            preco: number,
            logotipo: string | null
        }
    }
    export default defineComponent({
        name: "ListaCompara",
        components:{
            ModalItens
        },
        data(){
            return{

                listaComp: {
                    fornecedores:{},
                    "fornecedor-logotipo": {},
                    "produtos-nao-encontrados": {}
                } as DadosJson,
                produtos_nao_encontrados: [],
                fornecedores: {} as FornecedoresComLogotipos
            }
        },
        created(){
            this.getListas()
            console.log("TESTE" + JSON.stringify(this.fornecedores))
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
                    this.listaComp = data
                    console.log(data);

                    this.produtos_nao_encontrados = data["produtos-nao-encontrados"] //Separa os produtos nao encontrados
                    let fornecedoresComLogotipos: FornecedoresComLogotipos = {};
                    console.log(this.produtos_nao_encontrados)
                    for (const fornecedor in data.fornecedores) {
                        if (data.fornecedor_logotipo) {
                            for (const fornecedor in data.fornecedores) {
                                if (data.fornecedor_logotipo[fornecedor]) {
                                fornecedoresComLogotipos[fornecedor] = {
                                    preco: data.fornecedores[fornecedor],
                                    logotipo: data.fornecedor_logotipo[fornecedor]
                                };
                                } else {
                                fornecedoresComLogotipos[fornecedor] = {
                                    preco: data.fornecedores[fornecedor],
                                    logotipo: null
                                };
                                }
                            }
                        }
                    }

                    this.fornecedores = fornecedoresComLogotipos
                    console.log(this.fornecedores)
                })
                .catch(error => {
                    console.log('Erro:', error);
                });
                
        
            }
            catch{
                console.log("Erro ao carregar lista.")
            }
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
</style>