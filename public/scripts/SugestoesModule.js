class SugestoesModule {
  constructor(verbos, predicados) {
    this.verbos = verbos;
    this.predicados = predicados;
  }

  buscarVerbos(entradaUsuario) {
    console.log("(buscarverbos) Recebi a entrada: " + entradaUsuario);
    console.log("verbos que tenho: " + this.verbos)
    const verbosSugeridos = this.verbos.filter(verbo => verbo.toLowerCase().startsWith(entradaUsuario.toLowerCase()));
    console.log("(buscarverbos)Verbos sugeridos: ", verbosSugeridos);
    return verbosSugeridos;
  }

  exibirVerbosSugeridos(verbosSugeridos, callback) {
    const listaVerbosSugeridos = document.getElementById("lista-verbos-sugeridos");
    listaVerbosSugeridos.innerHTML = "";
    console.log("(exibirVerbosSugeridos)Exibindo verbos sugeridos: ", verbosSugeridos);
    
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
    console.log("(exibirPredicadosSugeridos) Exibindo predicados do verbo: ", verbo);

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
