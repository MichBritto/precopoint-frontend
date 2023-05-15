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
        quantidade: 10,
        quantidadeTotal: 0,
        valorTotal: 0
        
      }
    },
    methods: {
      generatePDF() {
        
        this.products.forEach((produto) => {
            const valorItem = produto.preco * produto.qtde;
            this.valorTotal += valorItem;
        });
        this.quantidadeTotal = this.products.reduce((acumulador, produto) => acumulador + produto.qtde, 0);
   
        
        const documentDefinition = {
        pageSize: 'A4',
        pageMargins: [0, 0, 0, 0],
        content: [
          {
            stack: [
              {
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 793,
                    h: 50,
                    color: "#202A2E",
                  },
                ],
                margin: [0, 10, 0, 10],
                
              },
              {
                type: 'text',
                text: 'PrecoPoint',
                alignment: 'center',
                fontSize: 30,
                style: 'header',
                background: "#202A2E"
              },
              {
                type: 'text',
                text: this.nomeArquivo,
                alignment: 'center',
                fontSize: 25,
                bold: true,
                margin: [0, 20, 0, 20]
              },
              {
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', {width: 55, alignment: 'right'}, {width: 'auto', alignment: 'center'}, {width: 80, alignment: 'right'}],
                    body: [
                      [
                        {text: "Produto", style: 'head' },
                        {text: "Detalhes          ", style: 'head'},
                        {text: "Preco     ", style: 'head'},
                        {text: "Quantidade", style: 'head'},
                        {text: "Valor     ", style: 'head', alignment:'right'}
                      ],
                      ...this.products.map((product) => [
                        product.produto,
                        product.descricao,
                        {text: product.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }), alignment: 'right'},
                        {text: product.qtde, alignment: 'right'},
                        {text: (product.preco * product.qtde).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }), alignment: 'right'}
                      ]),
                    ], style: 'table_theme'           
                  },
                
                margin: [50, 40, 40, 0]
              },
              {
                table: {
                    alignment: 'center',
                    headerRows: 1,
                    widths: ['60%', '40%'],
                    body: [
                      [
                        {text: "Quantidade de Produtos", style: 'head' },
                        {text: "Valor Total", style: 'head', alignment: 'right'},
                      ],
                      [
                        {text: this.quantidadeTotal, alignment: 'center'},
                        {text: this.valorTotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }), alignment: 'right'}
                      ]
                    ], style: 'table_theme'                    
                  },
                  
                margin: [50, 40, 40, 0] 
              },
            ],
          },
        ],
        styles: {
          header: {
            bold: true,
            margin: [0, -50, 0, 10],
            background: "#000000",
            color: "#FFA500",
          },
          head: {
            bold: true,
            fontSize: 14,
            fillColor: '#202A2E',
            color: '#FFFFFF',
            alignment: 'center'
          },
          table_theme:{
            alignment: 'center',
            
          }

        },
        layout: {
            defaultBorder: false,
          },
        };
        pdfMake.createPdf(documentDefinition).download(this.nomeArquivo ? this.nomeArquivo + '.pdf' : undefined);

      },
    },
  })

  </script>
  