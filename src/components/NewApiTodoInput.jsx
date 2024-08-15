import { observer } from "mobx-react-lite";
import todoStore from "../store/todoStore";

function NewApiTodoInput() {
    return (
        <>
            <div className="todo-api-input">
                <input
                    id="task" 
                    type="number"
                    name="task"
                    min="0"
                    value={todoStore.apiValue}
                    onChange={(e) => todoStore.setApiValue(e.target.value)}
                    className="todo-api-input__number"
                />
                <button className="todo-api-input__button" onClick={()=> {todoStore.fetchTodos()}}>Add todos from API</button>
            </div>
            <div className="todo-api-input__error">
                {todoStore.errorMessage.api && (
                    <span className="todo-api-input__error-message">{todoStore.errorMessage.api}</span>
                )}
            </div>
        </>
        
    )
}

export default observer(NewApiTodoInput);