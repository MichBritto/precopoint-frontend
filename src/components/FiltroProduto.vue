<template>
    <!--FILTRO--> 
    <div class="container ">
        <span class="fw-bold me-3">Filtrar por:</span>
        <!--button FILTO-->
        <a class="border rounded shadow p-1" href="" data-bs-toggle="modal" data-bs-target="#filtro">
            <i class="fa-solid fa-filter text-center text-dark img-filtro"></i>
        </a> 
        <!--Modal-->
        <div class="modal fade" id="filtro" ref="modalFiltro"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold" id="staticBackdropLabel">Filtrar por:</h5>
                        <button ref="fecharBotao" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div>
                        <div class="modal-body">
                            <ul class="list-group">
                                <li class="list-group-item border-0">  
                                    <label for="faixaDePreco" class="form-label fw-bold">Preço médio <i class="fa-solid fa-dollar-sign text-success"></i></label>
                                    <ul>
                                        <li class="list-group-item border-0">
                                            <div class="input-group">
                                                <input v-model="precoMinimo" type="text" class="form-control" :class="{ 'is-invalid': !isNumero(precoMinimo) && precoMinimo != '' }" placeholder="Mínimo" inputmode="numeric">
                                                <span class="input-group-text">-</span>
                                                <input v-model="precoMaximo" type="text" class="form-control" :class="{ 'is-invalid': !isNumero(precoMaximo) && precoMaximo != '' }" placeholder="Máximo" inputmode="numeric">
                                                <div class="invalid-feedback">Faça corresponder o formato pedido</div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>                          
                            </ul>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button class="btn btn-outline-success" @click="aplicarFiltro">Aplicar Filtro</button>
                            <button type="button" class="btn btn-outline-primary" @click="limparFiltro">Limpar Filtro</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
    
<script lang="ts">
    import {defineComponent} from 'vue'
    export default defineComponent({
        name: 'FiltroProduto',
        components: {
        },
        data() {
            return {
                precoMaximo: '',
                precoMinimo: '',
            }
        },
        methods: {
            isNumero(valor: string) {
                return !isNaN(parseFloat(valor))
            },
            aplicarFiltro() {
                //verifica se os inputs são numéricos
                if ((!this.isNumero(this.precoMinimo) && this.precoMinimo !== '') || (!this.isNumero(this.precoMaximo) && this.precoMaximo !== '')) {
                    // Mostrar mensagem de erro
                    return
                }
                // Emitindo o evento para informar o componente pai
                this.$emit('filtro-aplicado', { precoMinimo: this.precoMinimo, precoMaximo: this.precoMaximo })
                //Fechar o modal simulando um click no botão de fechar
                const botao = this.$refs.fecharBotao as HTMLElement;
                botao.dispatchEvent(new MouseEvent('click'));
            },
            limparFiltro() {
                this.precoMaximo = '';
                this.precoMinimo = '';
            }
      }
    })
</script>
    
<style scoped>
    .img-filtro{
        height: 20px;
        width: 20px;
    }
</style>