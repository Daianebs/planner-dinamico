// TarefasModule.js

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

  limparCamposEOcultar();

  exibirMensagemConfirmacao();
}

function limparCamposEOcultar() {
  document.getElementById("input-acao").value = "";
  document.getElementById("input-predicado").value = "";
  document.getElementById("lista-predicados-sugeridos").innerHTML = "";
  document.getElementById("opcoes-predicados").style.display = "none";
  document.getElementById("form-modal").style.display = "none";
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
    itemLista.draggable = true;
    itemLista.setAttribute("data-index", index); // Adiciona um atributo para identificar o índice

    // Evento para iniciar o drag
    itemLista.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", index);
    });

    // Adicionar evento de duplo clique para editar a tarefa
    itemLista.addEventListener("dblclick", () => editarTarefa(index));

    const botoesTarefa = document.createElement("span");
    botoesTarefa.className = "botoes-tarefa";
    itemLista.appendChild(botoesTarefa);

    const botaoExcluir = document.createElement("span");
    botaoExcluir.textContent = "X";
    botaoExcluir.className = "acao botao-excluir";
    botaoExcluir.addEventListener("click", () => excluirTarefa(index));
    botoesTarefa.appendChild(botaoExcluir);

    listaTarefas.appendChild(itemLista);
  });
}

// Função para permitir o drop
window.allowDrop = function (event) {
  event.preventDefault();
};

// Função para realizar o drop e reordenar as tarefas
window.drop = function (event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const fromIndex = parseInt(data, 10); // Índice original da tarefa arrastada
  const toIndex = event.target.dataset.index; // Índice do alvo onde a tarefa será solta

  if (fromIndex !== toIndex) {
    // Reordena o array de tarefas
    const movedTarefa = tarefasDia.splice(fromIndex, 1)[0];
    tarefasDia.splice(toIndex, 0, movedTarefa);

    // Atualiza o localStorage com o novo array ordenado
    localStorage.setItem("tarefas", JSON.stringify(tarefasDia));

    // Atualiza a exibição das tarefas na interface
    exibirTarefasDia();
  }
};

function editarTarefa(index) {
  const itemLista = document.querySelectorAll("#lista-tarefas li")[index];
  const tarefaAtual = tarefasDia[index];

  const inputEdicao = document.createElement("input");
  inputEdicao.type = "text";
  inputEdicao.value = tarefaAtual;
  inputEdicao.className = "input-edicao";

  inputEdicao.addEventListener("blur", () => {
    const novaTarefa = inputEdicao.value.trim();
    if (novaTarefa !== "") {
      tarefasDia[index] = novaTarefa;
      localStorage.setItem('tarefas', JSON.stringify(tarefasDia));
      exibirTarefasDia();
    } else {
      exibirTarefasDia();
    }
  });

  inputEdicao.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      inputEdicao.blur();
    }
  });

  itemLista.textContent = "";
  itemLista.appendChild(inputEdicao);
  inputEdicao.focus();
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
