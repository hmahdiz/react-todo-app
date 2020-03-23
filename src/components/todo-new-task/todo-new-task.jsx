import React from 'react';
import './todo-new-task.css';

class TodoNewTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTask: '',
        }
    }

    onChangeNewTaskInput = (e) => {
        this.setState({ newTask: e.target.value });
    }

    onAdd = (e) => {
        this.props.onAdd(this.state.newTask);
        this.setState({ newTask: '' });
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onAdd}>
                <input type='text' name='newTask' className="new-todo" autoFocus
                    placeholder='What do you need to do?'
                    value={this.state.newTask}
                    onChange={this.onChangeNewTaskInput} />
            </form>);
    }
}

export default TodoNewTask;