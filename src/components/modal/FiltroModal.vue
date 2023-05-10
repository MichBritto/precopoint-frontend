<template>
    <div class="modal fade" id="filtro"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="staticBackdropLabel">Filtrar por:</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="">
                    <div class="modal-body">
                        <ul class="list-group">
                            <li class="list-group-item border-0">  
                                <label for="faixaDePreco" class="form-label fw-bold">Preço médio</label>
                                <input type="range" class="form-range w-75 d-block" id="faixaPreco">
                            </li>
                            <li class="list-group-item border-0">                 
                                <label for="faixaPreco" class="form-label fw-bold">Supermercado</label>
                                <div class="">
                                    <input class="form-check-input ms-1" type="checkbox" id="check1" name="check1" value="something" >
                                    <label class="form-check-label ms-1">Supermercado 1</label>
                                </div>
                                <div class="">
                                    <input class="form-check-input ms-1" type="checkbox" id="check1" name="check1" value="something" >
                                    <label class="form-check-label ms-1">Supermercado 2</label>
                                </div>
                                <div class="">
                                    <input class="form-check-input ms-1" type="checkbox" id="check1" name="check1" value="something" >
                                    <label class="form-check-label ms-1">Supermercado 3</label>
                                </div>   
                            </li>
                            <li class="list-group-item border-0">                 
                                <label for="faixaPreco" class="form-label fw-bold">Classificação do Produto</label>
                                <div class="estrelas">
                                    <input type="radio" id="cm_star-empty" name="fb" value="" checked/>
                                    <label for="cm_star-1"><i class="fa"></i></label>
                                    <input type="radio" id="cm_star-1" name="fb" value="1"/>
                                    <label for="cm_star-2"><i class="fa"></i></label>
                                    <input type="radio" id="cm_star-2" name="fb" value="2"/>
                                    <label for="cm_star-3"><i class="fa"></i></label>
                                    <input type="radio" id="cm_star-3" name="fb" value="3"/>
                                    <label for="cm_star-4"><i class="fa"></i></label>
                                    <input type="radio" id="cm_star-4" name="fb" value="4"/>
                                    <label for="cm_star-5"><i class="fa"></i></label>
                                    <input type="radio" id="cm_star-5" name="fb" value="5"/>
                                </div>
                            </li>                           
                        </ul>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-outline-primary">Limpar</button>
                        <button type="submit" class="btn btn-outline-success">Aplicar Filtro</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FiltroModal'
})
</script>
