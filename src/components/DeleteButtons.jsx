import { observer } from "mobx-react-lite";
import todoStore from "../store/todoStore";

function DeleteButtons() {
    return (
        <div className="todo-list__delete-buttons">
            <button className="todo-list__button todo-list__button--delete-all" onClick={()=> {todoStore.deleteAllTodos()}}>Delete all todos</button>
            <button className="todo-list__button todo-list__button--delete-api" onClick={()=> {todoStore.deleteApiTodos()}}>Delete API todos</button>
            <button className="todo-list__button todo-list__button--delete-user" onClick={()=> {todoStore.deleteUserTodos()}}>Delete user todos</button>
        </div>
    )
}

export default observer(DeleteButtons);