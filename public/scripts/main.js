import TarefasModule, { carregarDados, verbos, predicados } from './TarefasModule.js';
import SugestoesModule from './SugestoesModule.js';
import InterfaceUsuarioModule from './InterfaceUsuarioModule.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  carregarDados(); 

  // Espera pelo carregamento completo dos dados antes de continuar
  setTimeout(() => {
    //console.log("Verbos após carregar dados:", verbos);
    const sugestoesModule = new SugestoesModule(verbos, predicados);
   // console.log("sugestoesmodule:", sugestoesModule);

    const interfaceUsuarioModule = new InterfaceUsuarioModule(sugestoesModule, TarefasModule);

    const botaoAdicionar = document.getElementById("botao-adicionar");
    botaoAdicionar.addEventListener("click", () => {
      console.log("Botão 'Adicionar Nova Tarefa' clicado");
    document.getElementById("opcoes").style.display = "block";
    });

    const inputAcao = document.getElementById("input-acao");
    inputAcao.addEventListener("input", () => {
      const textoDigitado = inputAcao.value.trim();
      console.log("Texto digitado em tempo real:", textoDigitado);
       
   // Chama a função buscarVerbos para obter os verbos sugeridos
   const verbosSugeridos = sugestoesModule.buscarVerbos(textoDigitado);
   interfaceUsuarioModule.exibirOpcoes(textoDigitado)
    });

  }, 100); // Espera antes de criar as instâncias, ajuste conforme necessário

});
 