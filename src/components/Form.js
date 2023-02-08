import React from "react";
import { useState } from "react";

export const Form = () => {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [editing, setEditing] = useState(null);

  const editTodo = (id) => {
    setEditing(id);
    const todo = toDos.find((t) => t.id === id);
    setToDo(todo.text);
  };

  const updateTodo = (id) => {
    console.log(editing);
    setToDos(
      toDos.filter((todo) => {
        if (todo.id === editing) {
          todo.text = toDo;
        }
        return todo;
      })
    );
    setEditing(null);
  };

  const deleteTodo = (data) => {
    setToDos(toDos.filter((todos) => todos.id !== data.id));
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          value={toDo}
          onChange={(event) => setToDo(event.target.value)}
          placeholder="🖊️ Add item..."
        />
        <i
          className="fas fa-plus"
          onClick={() => {
            if (editing) {
              updateTodo();
            }
            if (toDo && editing == null) {
              setToDos([
                ...toDos,
                { id: Date.now(), text: toDo, status: false },
              ]);
              setToDo("");
            }
            setToDo("");
          }}
        ></i>
      </div>
      {toDos.map((data) => {
        return (
          <div className="todos">
            <div className="todo">
              <div className="left">
                <p
                  style={{
                    textDecoration: data.status ? "line-through red" : "",
                  }}
                >
                  {data.text}
                </p>
              </div>
              <div className="right">
                <i
                  className="fa-regular fa-check"
                  onClick={(e) => {
                    setToDos(
                      toDos.filter((obj) => {
                        if (obj.id === data.id) {
                          obj.status = !obj.status;
                        }
                        return obj;
                      })
                    );
                  }}
                ></i>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => editTodo(data.id)}
                />
                <i
                  className="fas fa-times"
                  onClick={() => deleteTodo(data)}
                ></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
