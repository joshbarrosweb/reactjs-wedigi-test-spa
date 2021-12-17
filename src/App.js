import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './styles/App.css';
import _ from 'lodash';
import { v4 } from 'uuid';

function App() {
  const [state, setState] = useState({
    todo: {
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const copiedItem = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        copiedItem
      );

      return prev;
    });
  };

  const [text, setText] = useState('');

  const addTodo = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          items: [
            {
              id: v4(),
              name: text,
            },
            ...prev.todo.items,
          ],
        },
      };
    });
  };

  const deleteTodo = (id) => {
    let shouldDelete = confirm(`Deseja excluir o item?`);

    if (shouldDelete == true) {
      const todoRemove = state.todo.items.filter((todo) => {
        let toBeDeleted = todo.id !== id;

        return toBeDeleted;
      });

      setState({
        todo: {
          items: todoRemove,
        },
      });
    }
  };

  const editTodo = (id) => {
    let todoEdit = state.todo.items.find((item) => item.id == id);

    let newName = prompt(`Digite o novo nome para o elemento \n \n${id}: `);

    console.log(todoEdit);

    if (newName) {
      const todos = [...state.todo.items];
      const indexOfTodo = state.todo.items.findIndex((todo) => todo.id === id);
      todos[indexOfTodo].name = newName;
      setState({
        todo: {
          items: todos,
        },
      });
    }
  };

  return (
    <div>
      <div className="add-todo-form-wrapper">
        <h1>WeDigi - Todo Challenge</h1>
        <input
          className="add-todo-form"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={'column'}>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={'droppable-col'}
                    >
                      {data.items.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided) => {
                              return (
                                <div
                                  className={'item'}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                  <div className={'options'}>
                                    <button
                                      onClick={() => editTodo(el.id)}
                                      className="edit-todo"
                                    >
                                      E
                                    </button>
                                    <button
                                      onClick={() => deleteTodo(el.id)}
                                      className="delete-todo"
                                    >
                                      X
                                    </button>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
