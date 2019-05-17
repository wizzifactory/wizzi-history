import React from 'react';
import { todosModels } from '../../features/todos/index';
import TodosList from './TodosList';
import AddTodoForm from './AddTodoForm';

interface Props {
    filter: todosModels.TodosFilter;
    todos: todosModels.Todo [];
    filteredTodos: todosModels.Todo [];
    onAdd: (title: string) => void;
    onToggle: (id: string) => void;
    onChangeFilter: (filter: todosModels.TodosFilter) => void;
}

export default class Todos extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const {filter, todos, filteredTodos, onAdd, onChangeFilter, onToggle} = this.props;
        return (
            <div style={{padding: '100px 100px'}}>
                <h1>Todos</h1>
                <div>
                    <span>filter: </span>
                    <select
                        value={filter}
                        onChange={
                        (ev) => {
                            onChangeFilter(ev.target.value as todosModels.TodosFilter);
                        }
                    }
                    >
                        <option value="all">all</option>
                        <option value="completed">completed</option>
                        <option value="active">active</option>
                    </select>
                </div>
                <TodosList
                    todos={todos}
                    filteredTodos={filteredTodos}
                    onTodoClicked={onToggle}
                />
                <AddTodoForm handleSubmit={onAdd} />
            </div>
        );
    }
}
