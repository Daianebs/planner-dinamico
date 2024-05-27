import { carregarDados, verbos, predicados } from './TarefasModule.js';
import SugestoesModule from './SugestoesModule.js';
import InterfaceUsuarioModule from './InterfaceUsuarioModule.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  carregarDados();
  console.log("Verbos após carregar dados:", verbos)
  const sugestoesModule = new SugestoesModule(verbos, predicados);
  const interfaceUsuarioModule = new InterfaceUsuarioModule(sugestoesModule);

  const botaoAdicionar = document.getElementById("botao-adicionar");
  botaoAdicionar.addEventListener("click", () => {
    console.log("Botão 'Adicionar Nova Tarefa' clicado");

    interfaceUsuarioModule.exibirOpcoes();
      // Event listener para monitorar a entrada em tempo real no campo input-acao
  const inputAcao = document.getElementById("input-acao");
  inputAcao.addEventListener("input", () => {
    const textoDigitado = inputAcao.value.trim();
    console.log("Texto digitado em tempo real:", textoDigitado);
  });
  });
});
