<template>
    <div>
      <button type="button" class="btn btn-dark hover mb-2"  @click="generatePDF">Gerar Lista</button>
    </div>
  </template>
  
  <script>
  import pdfMake from "pdfmake/build/pdfmake";
  import pdfFonts from "pdfmake/build/vfs_fonts";
  import Cookies from "js-cookie"
  import { defineComponent} from 'vue'
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  export default defineComponent({
    name: "geraPDF",
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
    data(){
      return{
        nomeArquivo: Cookies.get('nomeLista'),
        quantidade: 10
      }
    },
    
    methods: {
      generatePDF() {
        
        this.products.forEach(element => {
            console.log(element.produto)
        });
        const documentDefinition = {
          content: [
            {
              text: "List of Products",
              style: "header",
            },
            {
              table: {
                headerRows: 1,
                body: [
                  ["Produto", "Detalhes", "Preco", "Quantidade", "Valor" ],
                  ...this.products.map((product) => [product.produto, product.descricao,
                  
                  product.preco.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }), 
                  this.quantidade.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  , this.quantidade.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  
                  /*product.quantidade, product.quantidade*/]),
                ],
              },
            },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
            },
          },
        };
        pdfMake.createPdf(documentDefinition).download(this.nomeArquivo ? this.nomeArquivo + '.pdf' : undefined);

      },
    },
  })

  </script>
  