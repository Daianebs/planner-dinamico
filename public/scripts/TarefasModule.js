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

  exibirMensagemConfirmacao("Tarefa adicionada! Agora não se esquecerá! :D");
}

function limparCamposEOcultar() {
  document.getElementById("input-acao").value = "";
  document.getElementById("input-predicado").value = "";
  document.getElementById("lista-predicados-sugeridos").innerHTML = "";
  document.getElementById("opcoes-predicados").style.display = "none";
  document.getElementById("form-modal").style.display = "none";
}

function exibirMensagemConfirmacao(texto) {
  const confirmacao = document.getElementById("confirmacao");
  confirmacao.textContent = texto;
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

    // Evento para detectar a movimentação durante o drag
    itemLista.addEventListener("dragover", (event) => {
      event.preventDefault();
      const rect = itemLista.getBoundingClientRect();
      const dragX = event.clientX - rect.left;
      if (dragX < 50) { // Quando arrasta para a esquerda
        itemLista.classList.add("excluir-hover");
        console.log("clicado para excluir");
        criarModalConfirmacao(index);
      } else {
        itemLista.classList.remove("excluir-hover");
      }
    });

    // Evento para soltar o item arrastado
    itemLista.addEventListener("drop", (event) => {
      event.preventDefault();
      const fromIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
      const toIndex = parseInt(event.target.getAttribute("data-index"), 10);

      if (fromIndex !== toIndex) {
        // Reordena o array de tarefas
        const movedTarefa = tarefasDia.splice(fromIndex, 1)[0];
        tarefasDia.splice(toIndex, 0, movedTarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefasDia));
        exibirTarefasDia();
      }
    });

    // Adicionar evento de duplo clique para editar a tarefa
    itemLista.addEventListener("dblclick", () => editarTarefa(index));

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
      exibirMensagemConfirmacao("Tarefa Editada!")
      exibirTarefasDia();
    } else {
      exibirTarefasDia();
      exibirMensagemConfirmacao("Preencha um nome ou exclua!")
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

function criarModalConfirmacao(index) {
  const confirmacaoModal = document.createElement("div");
  confirmacaoModal.id = "confirmacao-modal";
  confirmacaoModal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalTexto = document.createElement("p");
  modalTexto.textContent = "Tem certeza de que deseja excluir esta tarefa?";
  modalContent.appendChild(modalTexto);

  const btnConfirmar = document.createElement("button");
  btnConfirmar.id = "btn-confirmar";
  btnConfirmar.textContent = "Confirmar";
  modalContent.appendChild(btnConfirmar);

  const btnCancelar = document.createElement("button");
  btnCancelar.id = "btn-cancelar";
  btnCancelar.textContent = "Cancelar";
  modalContent.appendChild(btnCancelar);

  confirmacaoModal.appendChild(modalContent);
  document.body.appendChild(confirmacaoModal);

  // Mostrar o modal
  confirmacaoModal.style.display = "block";

  // Adicionar evento aos botões
  btnConfirmar.onclick = function () {
    excluirTarefa(index);
    exibirMensagemConfirmacao("Tarefa excluída!")
    confirmacaoModal.remove();
  };

  btnCancelar.onclick = function () {
    confirmacaoModal.remove();
    console.log("excluir cancelado, tarefa permanece")
  };
}


function excluirTarefa(index) {
  tarefasDia.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefasDia));
  exibirTarefasDia();
}

export default {
  carregarDados,
  adicionarNovaAcao,
  exibirTarefasDia,
};
