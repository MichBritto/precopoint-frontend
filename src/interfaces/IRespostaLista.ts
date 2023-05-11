export default interface RespostaLista {
  fornecedores: {
    [key: string]: number;
  };
  "produtos-nao-encontrados": {
    [key: string]: string[];
  };
}
