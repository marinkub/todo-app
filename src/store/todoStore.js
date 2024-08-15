import { action, makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

class TodoStore {
    todos = [];
    loading = true;
    todoName = '';
    count = 0;
    apiValue = 0;
    errorMessage = {
        user: '',
        api: ''
    };
    modalShow = false;

    constructor() {
        makeObservable(this, {
           todos: observable,
           loading: observable,
           todoName: observable,
           count: observable,
           apiValue: observable,
           errorMessage: observable,
           modalShow: observable,
           setValue: action,
           setApiValue: action,
           addUserTodo: action,
           fetchRandomTodo: action,
           fetchTodos: action,
           deleteAllTodos: action,
           deleteApiTodos: action,
           deleteUserTodos: action,
           deleteSingleTodos: action,
           toggleTodo: action,
           countCompleted: action,
           closeModal: action
        })
    }

    setValue(value) {
        this.todoName = value;
    }

    setApiValue(value) {
        this.apiValue = value;
    }

    addUserTodo() {
        if(this.todoName !== '')
        {
            this.todos.unshift({id: Math.random() ,todo: this.todoName, source: "user", completed: false});
            this.loading = false;
            this.errorMessage.user = '';
        } else {
            this.errorMessage.user = "Please enter the task!";
        }
        
    }

    fetchRandomTodo = async()=> {
        try {
            const response = await axios.get("https://dummyjson.com/todos/random");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch a random todo", error);
            alert("Failed to fetch a random todo");
            return null;
        }
    };

    fetchTodos = async ()=> {
        if(this.apiValue > 0)
        {
            try {
                const todoPromises = Array.from({length: this.apiValue}, ()=> this.fetchRandomTodo());
                const randomTodos = await Promise.all(todoPromises);
                const todos = randomTodos.map(obj => ({ ...obj, source: "API"}));
                runInAction(()=> {
                    this.todos.unshift(...todos);
                    this.countCompleted();
                    this.errorMessage.api = '';
                    this.modalShow = true;
                })
                
            } catch (error) {
                console.error("Failed to fetch todos", error);
                alert("Failed to fetch todos");
            } finally {
                runInAction(() => {
                    this.loading = false;
                }) 
            }
        } else {
            this.errorMessage.api = "Number for API todos can't be 0 or empty!";
        }
        
    };

    deleteAllTodos() {
        this.todos = [];
        this.loading = true;
    }

    deleteApiTodos() {
        this.todos = this.todos.filter((t) => t.source !== "API");
        this.countCompleted();
    }

    deleteUserTodos() {
        this.todos = this.todos.filter((t) => t.source !== "user"); 
        this.countCompleted();
    }

    deleteSingleTodos(id) {
        this.todos = this.todos.filter((t) => t.id !== id);
        this.countCompleted();
    }

    toggleTodo = (id) => {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
        this.countCompleted();
    }

    countCompleted() {
        this.count = this.todos.filter((t) => t.completed === true).length;
    }

    closeModal = () => {
        this.modalShow = false;
    }
}

export default new TodoStore();