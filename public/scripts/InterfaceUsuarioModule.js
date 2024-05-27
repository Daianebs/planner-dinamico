class InterfaceUsuarioModule {
  constructor(sugestoesModule, tarefasModule) {
    this.sugestoesModule = sugestoesModule;
    this.tarefasModule = tarefasModule;
    this.iniciar();
  }

  iniciar() {
    const botaoAdicionar = document.getElementById("botao-adicionar");
    const formModal = document.getElementById("form-modal");

    botaoAdicionar.addEventListener("click", () => {
      console.log("Botão 'Adicionar Nova Tarefa' clicado");
      formModal.style.display = "flex";
    });

    const inputAcao = document.getElementById("input-acao");
    inputAcao.addEventListener("input", () => {
      const textoDigitado = inputAcao.value.trim();
      console.log("Texto digitado em tempo real:", textoDigitado);
      this.exibirOpcoes(textoDigitado);
    });
  }

  exibirOpcoes(textoAcao = "") {
    if (textoAcao !== "") {
      const verbosSugeridos = this.sugestoesModule.buscarVerbos(textoAcao);
      this.sugestoesModule.exibirVerbosSugeridos(verbosSugeridos, this.selecionarVerbo.bind(this));
    } else {
      console.log("Texto de ação está vazio");
    }
  }

  selecionarVerbo(verbo) {
    document.getElementById("input-acao").value = verbo;

    if (this.tarefasModule && typeof this.tarefasModule.adicionarNovaAcao === 'function') {
      this.sugestoesModule.exibirPredicadosSugeridos(verbo, this.tarefasModule.adicionarNovaAcao.bind(this.tarefasModule));
    } else {
      console.error('Função adicionarNovaAcao não está disponível em tarefasModule');
    }

    document.getElementById("lista-verbos-sugeridos").style.display = "none";
  }
}

export default InterfaceUsuarioModule;
