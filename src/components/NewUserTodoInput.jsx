import { observer } from "mobx-react-lite";
import todoStore from "../store/todoStore";

function NewUserTodoInput() {
    return (
        <>
            <div className="todo-user-input">
                <input 
                    id="todo"
                    type="text"
                    name="todo"
                    value={todoStore.todoName}
                    placeholder="New todo"
                    onChange={(e) => todoStore.setValue(e.target.value)}
                    className="todo-input__text"
                />
                
                <button className="todo-user-input__button" onClick={() =>{todoStore.addUserTodo()}}>Add new Todo</button>
            </div>
            <div className="todo-user-input__error">
                {todoStore.errorMessage.user && (
                            <span className="todo-user-input__error-message">{todoStore.errorMessage.user}</span>
                        )}
            </div>
        </>
        
    )
}

export default observer(NewUserTodoInput);