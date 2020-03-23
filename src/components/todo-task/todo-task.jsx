import React from 'react';
import './todo-task.css';

class TodoTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            newTodoName: ''
        }
    }

    changeValue = (e) => {
        this.setState({ newTodoName: e.target.value });
    }

    enableEditing = () => {
        if (this.props.todo.completed) {
            return;
        }
        this.setState(prevState => ({ editMode: !prevState.editMode, newTodoName: this.props.todo.name }));
    }

    completeValue = (e) => {
        if (e.key === 'Enter') {
            this.setState(prevState => ({ editMode: !prevState.editMode }));

            this.props.change(this.props.todo, this.state.newTodoName);
        }
    }

    cancelEditing = () => {
        this.setState({ editMode: false });
    }

    render() {
        let { todo } = this.props;
        let { editMode, newTodoName } = this.state;

        return (
            <div>

                <div className={"todo-item " + (todo.completed ? "completed" : "")} >
                    {todo.completed}
                    < div className="group" >
                        {!editMode ?
                            <div>
                                <input type="checkbox" className="todo-item-checkbox" checked={todo.completed}
                                    onChange={() => this.props.toggle(todo)} />
                                <label className="todo-item-label"
                                    onClick={this.enableEditing}
                                >{todo.name}</label>
                                <button className="remove-button" onClick={() => this.props.remove(todo)}></button>
                            </div>
                            :
                            <input className="todo-item-edit" autoFocus value={newTodoName}
                                onChange={this.changeValue}
                                onKeyDown={this.completeValue}
                                onBlur={this.cancelEditing}
                            />
                        }
                    </div>
                </div >
            </div>
        );
    }

}

export default TodoTask;