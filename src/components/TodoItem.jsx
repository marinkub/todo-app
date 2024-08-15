import { observer } from "mobx-react-lite";
import todoStore from "../store/todoStore";
function TodoItem(props) {
    const todo = props.todo;

    return (
        <li className="todo-list__item">
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={()=> todoStore.toggleTodo(todo.id)}
                className="todo-list__checkbox"
            />
            {todo.completed ? 
                <del className="todo-list__text todo-list__text--completed" id={todo.source}>{todo.todo}</del> : 
                <span className="todo-list__text" id={todo.source}>{todo.todo}</span>}
            <button className="todo-list__button todo-list__button--delete-single" onClick={()=> {todoStore.deleteSingleTodos(todo.id)}}>Delete</button>
        </li>
    )
}

export default observer(TodoItem);