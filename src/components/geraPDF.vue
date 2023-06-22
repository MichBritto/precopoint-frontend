<template>
  
  <div class="text-center">
    <button type="button" class="btn btn-dark hover mb-2"  @click="generate" ><i class="fa-solid fa-download" style="color: #ffffff;"></i></button>
  </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Cookies from "js-cookie"
import { defineComponent} from 'vue'
import api from '@/http'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default defineComponent({
  name: "geraPDF",
  props: {
    products: {
      type: Array,
      required: true,
    },
    fornec: {
      type: String,
      required: false
    }
  },
  data(){
    return{
      nomeArquivo: Cookies.get('nomeLista'),
      nomeFornec: '',
      quantidade: 10,
      quantidadeTotal: 0,
      valorTotal: 0,
      fornecedores: {},
      
      
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
    async generatePDF() {
      this.nomeFornec = Cookies.get('nomeFornec')
      this.quantidadeTotal = 0; 
      this.valorTotal = 0; 
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
              text: 'PrecoPoint' ,
              alignment: 'center',
              fontSize: 30,
              style: 'header',
              background: "#202A2E"
            },
            {
              type: 'text',
              text: this.nomeArquivo +  (this.nomeFornec ? ' - ' + this.nomeFornec : ''),
              alignment: 'center',
              fontSize: 25,
              bold: true,
              margin: [0, 20, 0, 0]
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
          margin: [200, 0, 0, 0]
          
        }

      },
      layout: {
          defaultBorder: false,
        },
      
      };
      if (this.nomeFornec) {
        documentDefinition.content[0].stack.push({
          table: {
                  alignment: 'center',
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
                  ], style: 'table_theme',
                    layout: {
                      defaultBorder: false,
                      layout: 'noBorders',
                      hLineWidth: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 1 : 0;
                      },
                      vLineWidth: function (i, node) {
                        return i === 0 ? 1 : 0;
                      },
                      hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? '#202A2E' : 'transparent';
                      },
                      vLineColor: function () {
                        return '#202A2E';
                      },
                      paddingLeft: function (i, node) {
                        return i === 0 ? 0 : 8;
                      },
                      paddingRight: function (i, node) {
                        return i === node.table.widths.length - 1 ? 0 : 8;
                      },
                    },
                    keepWithHeaderRows: 1,         
                },
              
              margin: [50, 40, 40, 0]
            },
            {
              table: {
                  alignment: 'center',
                  headerRows: 1,
                  widths: [ {width: 300, alignment: 'center'},  {width: 186, alignment: 'right'}],
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
                  ], style: 'table_theme',
                  layout: {
                    defaultBorder: false,
                    layout: 'noBorders',
                    hLineWidth: function (i, node) {
                      return i === 0 || i === node.table.body.length ? 1 : 0;
                    },
                    vLineWidth: function (i, node) {
                      return i === 0 ? 1 : 0;
                    },
                    hLineColor: function (i, node) {
                      return i === 0 || i === node.table.body.length ? '#202A2E' : 'transparent';
                    },
                    vLineColor: function () {
                      return '#202A2E';
                    },
                    paddingLeft: function (i, node) {
                      return i === 0 ? 0 : 8;
                    },
                    paddingRight: function (i, node) {
                      return i === node.table.widths.length - 1 ? 0 : 8;
                    }
                  },
                  keepWithHeaderRows: 1,                   
                },
                
              margin: [50, 40, 40, 60] 


        });
      }
      else{
        documentDefinition.content[0].stack.push({
          table: {
                  alignment: 'center',
                  headerRows: 1,
                  widths: ['*', 'auto', {width: 'auto', alignment: 'center'}],
                  body: [
                    [
                      {text: "Produto", style: 'head' },
                      {text: "Detalhes          ", style: 'head'},
                      {text: "Quantidade", style: 'head'},
                    ],
                    ...this.products.map((product) => [
                      product.produto,
                      product.descricao,
                      {text: product.qtde, alignment: 'right'}
                    ]),
                  ], style: 'table_theme',
                  layout: {
                    defaultBorder: false,
                    layout: 'noBorders',
                    hLineWidth: function (i, node) {
                      return i === 0 || i === node.table.body.length ? 1 : 0;
                    },
                    vLineWidth: function (i, node) {
                      return i === 0 ? 1 : 0;
                    },
                    hLineColor: function (i, node) {
                      return i === 0 || i === node.table.body.length ? '#202A2E' : 'transparent';
                    },
                    vLineColor: function () {
                      return '#202A2E';
                    },
                    paddingLeft: function (i, node) {
                      return i === 0 ? 0 : 8;
                    },
                    paddingRight: function (i, node) {
                      return i === node.table.widths.length - 1 ? 0 : 8;
                    },
                  },
                  keepWithHeaderRows: 1,         
                },
              
              margin: [50, 40, 40, 0]
            

        });
      }

      
      pdfMake.createPdf(documentDefinition).download(this.nomeArquivo ? this.nomeArquivo + '.pdf' : undefined);

    },
    generate(){
      if (this.products.length > 0){
        this.generatePDF()
      }
    },
    
  },
})

</script>
