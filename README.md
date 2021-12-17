# WeDigi TodoChallenge

Projeto desafio: Todo CRUD com possibilidade de reordenação de elementos.

## Como foi desenvolvido o projeto?

As estruturas de dados utilizadas foram: Objeto e Array.

Para desenvolver a todo experimental foi utilizado um simples objeto "todo", contendo um array de "items".
Ao cadastrar o novo item, é gerado dinamicamente um ID com uuid para evitar duplicidade nas chaves dos elementos,
e é inserido o nome desejado.

Ao clicar e arrastar, é possivel reordenar os todos na lista graças a ajuda da biblioteca "react-beautiful-dnd" onde temos um context "DragAndDrop" que permite reordenar os items livremente.

Ao clicar em editar é exibido um prompt simples, onde caso seja digitado o novo nome, ele é trocado.

Ao clicar em deletar, o todo é excluido da lista (caso haja confirmação).

Caso o usuario tente soltar o elemento fora da area de contexto, o elemento é resetado, visto que ele não é removido
ao ser clicado, somente quando ele é soltado, onde sua localização antiga é removida da memoria e a nova é registrada.

### Como rodar o projeto

### `npm install && npm run start`
