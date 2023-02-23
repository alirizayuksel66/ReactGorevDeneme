import { useState } from "react";
import { add, add2, remove } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";


function App() {

  const todos = useAppSelector(state => state.todos);
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const dispatch = useAppDispatch();
  const onSave = () => {
    dispatch(add(title));
    dispatch(add2(title2));
    setTitle("");
    setTitle2("");
  }

  const onDelete = (id: string) => {
    dispatch(remove(id))
  }

  return (
    <div className="App">
      <input placeholder="Adınız" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <input placeholder="Soyadınız" name="Soyadınız" value={title2} onChange={(e) => setTitle2(e.currentTarget.value)} />
      <button onClick={onSave}>Kaydet</button>
      <table>
        <tr>
          <th>Adı</th>
          <th>Soyadı</th>
          <th>İşlemler</th>
        </tr>
        {todos.map(todo => 
          <tr key={todo.id}>
            <td><span>{todo.title}</span></td>
            <td><span>{todo.title2}</span></td>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </tr>)}
      </table>
    </div>
  );
}

export default App;
