import * as React from 'react';
import {Todo} from '../../features/todos/models';

interface Props {
  todos: Todo[];
  filteredTodos: Todo[];
  onTodoClicked: (todoId: string) => void;
}
interface State { }

export default class AddTodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { filteredTodos, onTodoClicked } = this.props;
    return (
      <ul>
        {
          filteredTodos.map(todo => (
            <li
              key={todo.id}
              onClick={() => onTodoClicked(todo.id)}
              style={{ textDecoration: `${todo.completed ? 'line-through' : ''}`, cursor: 'pointer' }}
            >
              {todo.title}
            </li>)
          )
        }
      </ul>
    );
  }
}
