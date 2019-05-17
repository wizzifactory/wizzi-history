import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../store/reducers';
import { todosModels, todosSelectors } from '../../features/todos/index';
import { add, TodoAddPayload, toggle, TodoTogglePayload,
    changeFilter, TodosChangeFilterPayload } from '../../features/todos/actions';
import TodosComp from '../../components/todos';

interface StateProps {
    todos: todosModels.Todo [];
    filter: todosModels.TodosFilter;
    filteredTodos: todosModels.Todo [];
}

interface DispatchProps {
    add: (payload: TodoAddPayload) => void;
    toggle: (payload: TodoTogglePayload) => void;
    changeFilter: (payload: TodosChangeFilterPayload) => void;
}

const mapStateToProps = (state: AppState) => ({
    todos: state.todos.todos,
    filter: state.todos.todosFilter,
    filteredTodos: todosSelectors.getFilteredTodos(state.todos),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    add: (payload: TodoAddPayload) => {
        dispatch(add(payload));
    },
    toggle: (payload: TodoTogglePayload) => dispatch(toggle(payload)),
    changeFilter: (payload: TodosChangeFilterPayload) => dispatch(changeFilter(payload)),
});

const Todos = (props: RouteComponentProps<any> & StateProps & DispatchProps) => {
    return (
        <div>
            <TodosComp
                filter={props.filter}
                todos={props.todos}
                filteredTodos={props.filteredTodos}
                onToggle={
                    (id: string) => {
                        props.toggle({id});
                    }}
                onAdd={
                    (title: string) => {
                        props.add({title});
                    }}
                onChangeFilter={
                    (filter: todosModels.TodosFilter) => {
                        props.changeFilter(filter);
                    }}
            />
        </div>
    );
};

export default connect<StateProps, DispatchProps, RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(Todos);
