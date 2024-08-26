/*
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






class CriaConta {
    constructor(nome, sobrenome, email, senha, confirmarSenha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
        this.confirmarSenha = confirmarSenha;
    }

    validarEntrada() {
        // Verifica se algum dos campos obrigatórios está vazio
        if (this.nome === "" || this.sobrenome === "" || this.email === "" || this.senha === "" || this.confirmarSenha === "") {
            return 'Este campo é obrigatório';
        } else {
            // Se todos os campos estão preenchidos
            alert('Seja bem-vindo, sua conta foi criada');
            return true; // Retorna true para indicar que a validação foi bem-sucedida
        }
    }

    VerificacaoDeSenha() {
        // Verifica se a senha e a confirmação de senha coincidem
        if (this.senha === this.confirmarSenha) {
            return true;
        } else {
            return 'As senhas não coincidem!';
        }
    }

    mostraResultado() {
        const nome = this.nome;
        const sobrenome = this.sobrenome;
        const email = this.email;
        const senha = this.senha;

        // Verifica se a senha e a confirmação de senha são válidas
        const senhaValida = this.VerificacaoDeSenha();
        if (senhaValida !== true) {
            console.log(senhaValida); // Exibe erro se as senhas não coincidirem
            return;
        }

        console.log(`O nome é ${nome}`);
        console.log(`O sobrenome é ${sobrenome}`);
        console.log(`O e-mail é ${email}`);
        console.log(`A senha é ${senha}`);
        console.log(`A confirmação de senha está correta`);
    }
}

// Captura dados do usuário
/*
const nome = prompt('Digite seu nome:');
const sobrenome = prompt('Digite seu sobrenome:');
const email = prompt('Digite seu e-mail:');
const senha = prompt('Digite uma senha');
const confirmarSenha = prompt('Confirme sua senha');

// Cria uma nova conta
const criaConta = new CriaConta(nome, sobrenome, email, senha, confirmarSenha);

// Valida a entrada e mostra o resultado
const resultadoValidacao = criaConta.validarEntrada();
if (resultadoValidacao === true) {
    criaConta.mostraResultado();
} else {
    console.log(resultadoValidacao); // Exibe a mensagem de erro
}


const modal = document.querySelector('.modal-container')
const sNome = document.querySelector('#m-nome')
const sSobrenome = document.querySelector('#m-sobrenome')
const sTelefone = document.querySelector('#m-telefone')
const sEmail = document.querySelector('#m-email')
const sSenha = document.querySelector('#m-senha')
const sConfSenha = document.querySelector('#confSenha')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sSobrenome.value = itens[index].sobrenome
    sTelefone.value = itens[index].telefone
    sEmail.value = itens[index].email
    sSenha.value = itens[index].senha
    sConfSenha.value = itens[index].confSenha
    id = index
  } else {
    sNome.value = ''
    sSobrenome.value = ''
    sTelefone.value = ''
    sEmail.value = ''
    sSenha.value = ''
    sConfSenha.value = ''

  }
  console.log(openModal)
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

/*
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}
  

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].sobrenome = sSobrenome.value
    itens[id].telefone = sTelefone.value
    itens[id].email = sEmail.value
    itens[id].senha = sSenha.value
    itens[id].confSenha = sConfSenha.value
  } else {
    itens.push({'nome': sNome.value, 'sobrenome': sFuncao.value, 'salario': sSalario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}


function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}
  

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
*/

const produtos = [
  {id: 1, nome: "Iphone 14 Pro Max", preço:5000.00}

  {id: 2, nome: "Galaxy", preço:2500.00}

  {id: 3, nome: "Câmera Mirrorles Sony Alpha a72", preço:10000.00}

  {id: 4, nome: "smart Watches", preço:300.00}

  {id: 5, nome: "Desktop Gamer Auora", preço:1300.00}

  {id: 6, nome: "Laptop Ultra fino Zen Book Pro", preço:2000.00}

  {id: 7, nome: "Impressora multi funcional EcoTank L3250", preço:450.00}

  {id: 8, nome: "Ipad Pro", preço:8000.00}


  
]

















