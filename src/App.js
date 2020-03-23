import React from 'react';
import './App.css';
import TodoNewTask from './components/todo-new-task/todo-new-task';
import TodoTask from './components/todo-task/todo-task'
import Filter from './components/filter/filter'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "ALL",
      todos: [
        { id: 1, name: 'Task1', completed: false },
        { id: 2, name: 'Task2', completed: true },
        { id: 3, name: 'Task3', completed: false }]
    };
  }

  onAddNewTask = (newTask) => {
    const todos = [...this.state.todos, { id: this.state.todos.length + 1, name: newTask, completed: false }];
    this.setState({ todos });
  }

  onToggleTodo = (todoItem) => {
    let { todos } = this.state;
    let removedTodoItem = todos.find(t => t.id === todoItem.id);
    removedTodoItem.completed = !removedTodoItem.completed;

    this.setState({ todos });
  }

  onRemoveTodo = (todoItem) => {
    let { todos } = this.state;
    let removedTodoItemIndex = todos.indexOf(todoItem);
    todos.splice(removedTodoItemIndex, 1);

    this.setState({ todos });
  }

  OnChangeTodo = (todo, newTodoName) => {
    let { todos } = this.state;
    let changedItem = todos.find(t => t.id === todo.id);
    changedItem.name = newTodoName;

    this.setState({ todos });
  }

  onFilterClick = (filter) => {
    this.setState({ filter });
  }

  filterTodos = () => {
    let { todos } = this.state;
    switch (this.state.filter) {
      case "COMPLETED":
        return todos.filter(t => t.completed);
      case "ACTIVE":
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  }

  render() {
    let displayTodos = this.filterTodos();
    return (
      <div className="todo-app">
        <h1 className="todo-title">Todos</h1>
        <div className="todo-content">
          <TodoNewTask onAdd={this.onAddNewTask} />

          <section className="todo-list-section">
            {displayTodos.map(todo =>
              <TodoTask className="item" key={todo.id} todo={todo}
                toggle={(todoItem) => this.onToggleTodo(todoItem)}
                remove={(todoItem) => this.onRemoveTodo(todoItem)}
                change={(prevTodo, todoName) => this.OnChangeTodo(prevTodo, todoName)}></TodoTask>)}
          </section>

          <div className="todo-filter">
            <Filter name="All" onFilterClick={() => this.onFilterClick("ALL")}
              selected={this.state.filter == "ALL"} />
            <Filter name="Completed" onFilterClick={() => this.onFilterClick("COMPLETED")}
              selected={this.state.filter == "COMPLETED"} />
            <Filter name="Active" onFilterClick={() => this.onFilterClick("ACTIVE")}
              selected={this.state.filter == "ACTIVE"} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
