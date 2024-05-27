class SugestoesModule {
  constructor(verbos, predicados) {
    this.verbos = verbos;
    this.predicados = predicados;
  }

  buscarVerbos(entradaUsuario) {
    return this.verbos.filter(verbo => verbo.toLowerCase().startsWith(entradaUsuario.toLowerCase()));
  }

  exibirVerbosSugeridos(verbosSugeridos, callback) {
    const listaVerbosSugeridos = document.getElementById("lista-verbos-sugeridos");
    listaVerbosSugeridos.innerHTML = "";

    verbosSugeridos.forEach(verbo => {
      const itemLista = document.createElement("li");
      itemLista.textContent = verbo;
      itemLista.addEventListener("click", () => callback(verbo));
      listaVerbosSugeridos.appendChild(itemLista);
    });

    listaVerbosSugeridos.style.display = verbosSugeridos.length > 0 ? "block" : "none";
  }

  exibirPredicadosSugeridos(verbo, callback) {
    const listaPredicadosSugeridos = document.getElementById("lista-predicados-sugeridos");
    listaPredicadosSugeridos.innerHTML = "";

    if (this.predicados[verbo]) {
      this.predicados[verbo].forEach(predicado => {
        const itemLista = document.createElement("li");
        itemLista.textContent = predicado;
        itemLista.addEventListener("click", () => callback(verbo, predicado));
        listaPredicadosSugeridos.appendChild(itemLista);
      });
    }

    document.getElementById("opcoes-predicados").style.display = "block";
  }
}

export default SugestoesModule;