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



