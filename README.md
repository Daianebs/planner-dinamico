# Gerenciador de Tarefas

Este é um projeto de Gerenciador de Tarefas que permite aos usuários adicionar, editar, excluir e reordenar suas tarefas diárias rapidamente. O projeto é desenvolvido com HTML, CSS e JavaScript, utilizando módulos JavaScript para organizar o código.

## Funcionalidades

- **Adicionar Tarefa:** Permite ao usuário adicionar novas tarefas à lista com preenchimento automático de um banco de dados.
- **Editar Tarefa:** Permite ao usuário editar rapidamente com um duplo clique sobre elas, tornando a edição intuitiva e rápida.
- **Excluir Tarefa:** Permite ao usuário excluir uma tarefa arrastando-a para a esquerda, um modal de confirmação é exibido dinamicamente para evitar exclusões acidentais.
- **Reordenar Tarefas:** Permite ao usuário reordenar as tarefas arrastando e soltando-as na lista.
- **Persistência:** As tarefas são salvas no `localStorage` para que não sejam perdidas ao recarregar a página.

## Estrutura do Projeto

```
/
├── data/
│   └── tarefas-sugeridas.json
├── style/
│   └── add_tarefas.css
├── TarefasModule.js
├── InterfaceUsuarioModule.js
├── SugestoesModule.js
├── main.js
├── index.html
├── adicionar_tarefas.html
└── README.md
```

- `data/tarefas-sugeridas.json`: Contém sugestões de tarefas.
- `style/add_tarefas.css`: Estilos para a aplicação.
- `TarefasModule.js`: Módulo que gerencia as tarefas.
- `InterfaceUsuarioModule.js`: Módulo que gerencia a interface do usuário.
- `SugestoesModule.js`: Módulo que gerencia as sugestões de tarefas.
- `main.js`: Arquivo principal que inicializa a aplicação.
- `index.html`: Estrutura HTML inicial da aplicação.
- `adicionar_tarefas.html`: Estrutura HTML das tarefas.
- `README.md`: Arquivo de documentação do projeto.

---
## Capturas de tela da aplicação

Capturas de tela da aplicação em funcionamento

![image](https://github.com/Daianebs/planner-dinamico/assets/97747870/cee126cc-a1e1-41f9-92ed-79b0a57ef8e2)
![image](https://github.com/Daianebs/planner-dinamico/assets/97747870/015fd3a2-8142-42b9-85ba-ea2b2db17efb)


Este projeto foi desenvolvido para fins educacionais e de demonstração. Sinta-se à vontade para contribuir ou adaptar conforme suas necessidades.

---
## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.