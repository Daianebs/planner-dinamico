import TarefasModule, { carregarDados, verbos, predicados } from './TarefasModule.js';
import SugestoesModule from './SugestoesModule.js';
import InterfaceUsuarioModule from './InterfaceUsuarioModule.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  carregarDados(); 

  // Espera pelo carregamento completo dos dados antes de continuar
  setTimeout(() => {
    const sugestoesModule = new SugestoesModule(verbos, predicados);
    const interfaceUsuarioModule = new InterfaceUsuarioModule(sugestoesModule, TarefasModule);

  }, 100); // Espera antes de criar as instâncias, ajuste conforme necessário
});
 