<template>
    <div>
      <button type="button" class="btn btn-dark hover mb-2"  @click="generatePDF">Gerar Lista</button>
    </div>
  </template>
  
  <script>
  import pdfMake from "pdfmake/build/pdfmake";
  import pdfFonts from "pdfmake/build/vfs_fonts";
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
                  ...this.products.map((product) => [product.produto, product.descricao,product.preco, product.quantidade, 'R$' + Number(product.preco * product.quantidadel).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                    }) ]),
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
        pdfMake.createPdf(documentDefinition).download();
      },
    },
  })

  </script>
  