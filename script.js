class calculadoParcelamento {
    constructor (valorTotal, taxaDeJuros, numeroDeParcelas) {
        this.valorTotal = valorTotal;
        this.taxaDeJuros = taxaDeJuros;
        this.numeroDeParcelas = numeroDeParcelas;
        this.jurosPorParcela();
        
    }

jurosPorParcela() {
    if (this.numeroDeParcelas <= 5){
        this.taxaDeJuros = 5;
    } else if (this.numeroDeParcelas >= 6 && this.numeroDeParcelas <=10) {
        this.taxaDeJuros = 7;
        
    }else {
        (this.numeroDeParcelas >= 11 && <= 15 )
        this.taxaDeJuros = 10
    }
}

calcularParcela () {
    const taxaMensal = this.taxaDeJuros / 12 / 100;
    const valorParcela = this.valorTotal * taxaMensal / (1 - Math.pow(1 + taxaMensal, - this.numeroDeParcelas ));
    return (valorParcela.toFixed(2));
}



} 

function mostrarResultados(valorTotal, numeroDeParcelas) {
    const parcelamento = new calculadoParcelamento (valorTotal, 0, numeroDeParcelas);
    console.log(`Valor Total: R$ ${valorTotal}`);
    console.log(`Número de Parcelas: ${numeroDeParcelas}`);
    console.log(`Taxa de Juros Anual Ajustada: ${parcelamento.taxaDeJuros}%`);

    const valorParcela = calculadora.calcularParcela();
    
    console.log(`Valor da Parcela: R$ ${valorParcela}`);
}


const Produtos = [
    { nome: 'Apple Iphone 14',
      ram: 128gb,
      valorTotal: 3952.00,  
 },


    { nome: 'Samsung Galaxy S23', 
      ram: 128gb,
      valorTotal: 2785.95,  
  
      },

    { nome: 'Xaiomi Redmi Note 12', 
      ram: 256gb,
      valorTotal: 1027.22,  
  
      },

    { nome: 'Motorola Moto G54',
      ram: 256gb,
      valorTotal: 1078.52 
  
      },

  ]







