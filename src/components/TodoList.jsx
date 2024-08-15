import { observer } from "mobx-react-lite";
import todoStore from "../store/todoStore";
import TodoItem from "./TodoItem";
import NewUserTodoInput from "./NewUserTodoInput";
import NewApiTodoInput from "./NewApiTodoInput";
import DeleteButtons from "./DeleteButtons";
import Modal from "./Modal";


function TodoList() {
    if (todoStore.loading){
        return (
            <div className="todo-list"> 
                <h1 className="todo-list__title">Todo List</h1>
                <NewUserTodoInput />
                <NewApiTodoInput />
                <p className="todo-list__completed">No tasks</p>
            </div>
        )
    }

    return (
        <div className="todo-list">
            <h1 className="todo-list__title">Todo List</h1>
            <NewUserTodoInput />
            <NewApiTodoInput />
            <DeleteButtons />
            <p className="todo-list__completed">Completed todos:{todoStore.count}!</p>
            <ul className="todo-list__items">
                {todoStore.todos.map((todo)=> (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
            <Modal show={todoStore.modalShow} onClose={() => todoStore.closeModal()}/>
        </div>
    )
}

export default observer(TodoList);