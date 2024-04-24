const numeros = document.querySelectorAll("[data-numeros]");
const operacao = document.querySelectorAll("[data-operacao]");
const deletar = document.querySelector("[data-deletar]");
const limparTela = document.querySelector("[data-limparTela]");
const ponto = document.querySelector("[data-ponto]");
const igual = document.querySelector("[data-igual]");
const primeiroValorElemento = document.querySelector("[data-primeiroValor]");
const segundoValorElemento = document.querySelector("[data-segundoValor]");

class Calculadora {
  constructor(primeiroValor, segundoValor) {
    this.primeiroValor = primeiroValor;
    this.segundoValor = segundoValor;
    this.primeiroValorF = "";
    this.segundoValorF = "";
    this.operacao = undefined;
    this.limpar();
  }

  calcular() {
    let resultado;

    const primeiroValorFloat = parseFloat(this.primeiroValorF);
    const segundoValorFloat = parseFloat(this.segundoValorF);

    if (isNaN(primeiroValorFloat) || isNaN(segundoValorFloat)) return;

    switch (this.operacao) {
      case "+":
        resultado = primeiroValorFloat + segundoValorFloat;
        break;
      case "-":
        resultado = primeiroValorFloat - segundoValorFloat;
        break;
      case "*":
        resultado = primeiroValorFloat * segundoValorFloat;
        break;
      case "÷":
        resultado = primeiroValorFloat / segundoValorFloat;
        break;
    }

    this.segundoValorF = resultado;
    this.operacao = undefined;
    this.primeiroValorF = "";
  }

  fazerOperacao(operacao) {
    if (this.primeiroValorF != "") {
      this.calcular();
    }
    this.operacao = operacao;

    this.primeiroValorF = this.segundoValorF;
    this.segundoValorF = "";
  }

  mostrarNumero(numero) {
    if (this.segundoValorF.includes(".") && numero === ".") return;
    this.segundoValorF = `${this.segundoValorF}${numero.toString()}`;
  }

  limpar() {
    this.primeiroValorF = "";
    this.segundoValorF = "";
    this.Operacao = undefined;
  }

  deletar() {
    this.primeiroValorF = "";
    this.segundoValorF = "";
    this.operacao = "";
  }

  actualizar() {
    this.primeiroValor.innerText = `${this.primeiroValorF} ${
      this.operacao || ""
    }`;
    this.segundoValor.innerText = this.segundoValorF;
  }
}

const calculadora = new Calculadora(
  primeiroValorElemento,
  segundoValorElemento
);

for (const numero of numeros) {
  numero.addEventListener("click", () => {
    calculadora.mostrarNumero(numero.innerText);
    calculadora.actualizar();
  });
}

for (const opera of operacao) {
  opera.addEventListener("click", () => {
    calculadora.fazerOperacao(opera.innerText);
    calculadora.actualizar();
  });
}

limparTela.addEventListener("click", () => {
  calculadora.limpar();
  calculadora.actualizar();
});

igual.addEventListener("click", () => {
  calculadora.calcular();
  calculadora.actualizar();
});

deletar.addEventListener("click", () => {
  calculadora.deletar();
  calculadora.actualizar();
});
