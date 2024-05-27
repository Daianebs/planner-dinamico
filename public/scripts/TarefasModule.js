export let verbos = [];
export let predicados = {};
export let tarefasDia = [];

export function carregarDados() {
  fetch('./data/tarefas-sugeridas.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      verbos = Object.keys(data.tarefas);
      predicados = data.tarefas;
      console.log("Dados carregados com sucesso:", verbos, predicados);

      // Carregar tarefas do localStorage, se existirem
      const storedTarefas = localStorage.getItem('tarefas');
      if (storedTarefas) {
        tarefasDia = JSON.parse(storedTarefas);
        exibirTarefasDia(); // Atualizar interface com as tarefas carregadas
      }
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
}

export function adicionarNovaAcao(verbo, predicado) {
  const acao = `${verbo} ${predicado}`;
  tarefasDia.push(acao);
  localStorage.setItem('tarefas', JSON.stringify(tarefasDia));
  exibirTarefasDia();

  limparCamposeOcultar();

  exibirMensagemConfirmacao();
}

function limparCamposeOcultar() {
  document.getElementById("input-acao").value = "";
  document.getElementById("input-predicado").value = "";
  document.getElementById("lista-predicados-sugeridos").innerHTML = "";
  document.getElementById("opcoes-predicados").style.display = "none";
  document.getElementById("opcoes").style.display = "none";
}

function exibirMensagemConfirmacao() {
  const confirmacao = document.getElementById("confirmacao");
  confirmacao.textContent = "Tarefa adicionada! Agora não se esquecerá! :D";
  confirmacao.style.display = "block";
  setTimeout(() => {
    confirmacao.style.display = "none";
  }, 3000);
}

export function exibirTarefasDia() {
  const listaTarefas = document.getElementById("lista-tarefas");
  listaTarefas.innerHTML = "";

  tarefasDia.forEach((tarefa, index) => {
    const itemLista = document.createElement("li");
    itemLista.textContent = tarefa;

    const botoesTarefa = document.createElement("span");
    botoesTarefa.className = "botoes-tarefa";
    itemLista.appendChild(botoesTarefa);

    const botaoEditar = document.createElement("span");
    botaoEditar.textContent = "Editar";
    botaoEditar.className = "acao";
    botaoEditar.addEventListener("click", () => editarTarefa(index));
    botoesTarefa.appendChild(botaoEditar);

    const botaoExcluir = document.createElement("span");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "acao";
    botaoExcluir.addEventListener("click", () => excluirTarefa(index));
    botoesTarefa.appendChild(botaoExcluir);

    listaTarefas.appendChild(itemLista);
  });
}

function editarTarefa(index) {
  const novaTarefa = prompt("Digite o nome da tarefa:");
  if (novaTarefa !== null) {
    tarefasDia[index] = novaTarefa;
    localStorage.setItem('tarefas', JSON.stringify(tarefasDia));
    exibirTarefasDia();
  }
}

function excluirTarefa(index) {
  if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
    tarefasDia.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefasDia));
    exibirTarefasDia();
  }
}

export default {
  carregarDados,
  adicionarNovaAcao,
  exibirTarefasDia,
};
