class InterfaceUsuarioModule {
  constructor(sugestoesModule, tarefasModule) {
    this.sugestoesModule = sugestoesModule;
    this.tarefasModule = tarefasModule;
  }


  exibirOpcoes(textoAcao) {
    if (textoAcao !== "") {
      const verbosSugeridos = this.sugestoesModule.buscarVerbos(textoAcao);
      console.log("Verbos sugeridos: ", verbosSugeridos); // Log para verificar os verbos sugeridos
      this.sugestoesModule.exibirVerbosSugeridos(verbosSugeridos, this.selecionarVerbo.bind(this));
    } else {
      console.log("Texto de ação está vazio"); // Log para verificar se a condição não é atendida
    }
  }

  selecionarVerbo(verbo) {
    document.getElementById("input-acao").value = verbo;
  
    // Verifica se tarefasModule está definido e adicionarNovaAcao é uma função
    if (this.tarefasModule && typeof this.tarefasModule.adicionarNovaAcao === 'function') {
      // Chama exibirPredicadosSugeridos com verbo e adicionarNovaAcao vinculado ao contexto de tarefasModule
      this.sugestoesModule.exibirPredicadosSugeridos(verbo, this.tarefasModule.adicionarNovaAcao.bind(this.tarefasModule));
    } else {
      console.error('Função adicionarNovaAcao não está disponível em tarefasModule');
    }
    document.getElementById("lista-verbos-sugeridos").style.display = "none";
    
  }
  
}



export default InterfaceUsuarioModule;
