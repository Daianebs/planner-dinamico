class InterfaceUsuarioModule {
  constructor(sugestoesModule, tarefasModule) {
    this.sugestoesModule = sugestoesModule;
    this.tarefasModule = tarefasModule;
  }

 
  exibirOpcoes() {
    document.getElementById("opcoes").style.display = "block";
    const textoAcao = document.getElementById("input-acao").value.trim();
    console.log("Texto de ação recebido: " + textoAcao); // Log para verificar o valor do texto
    if (textoAcao !== "") {
      console.log("Texto de ação não está vazio: " + textoAcao); // Log para verificar se a condição é atendida
      const verbosSugeridos = this.sugestoesModule.buscarVerbos(textoAcao);
      console.log("Verbos sugeridos: ", verbosSugeridos); // Log para verificar os verbos sugeridos
      this.sugestoesModule.exibirVerbosSugeridos(verbosSugeridos, this.selecionarVerbo.bind(this));
    } else {
      console.log("Texto de ação está vazio"); // Log para verificar se a condição não é atendida
    }
  }

  selecionarVerbo(verbo) {
    document.getElementById("input-acao").value = verbo;
    this.sugestoesModule.exibirPredicadosSugeridos(verbo, this.tarefasModule.adicionarNovaAcao.bind(this.tarefasModule));
    document.getElementById("lista-verbos-sugeridos").style.display = "none";
  }
}

export default InterfaceUsuarioModule;
