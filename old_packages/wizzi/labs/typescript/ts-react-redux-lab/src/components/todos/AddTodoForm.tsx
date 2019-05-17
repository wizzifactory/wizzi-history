import * as React from 'react';
import { FormEvent } from 'react';

interface Props {
  handleSubmit: (value: string) => void;
}

interface State {
  value: string;
}

export default class AddTodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  updateValue = (value: string) => {
    this.setState({ value });
  }

  handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    if (!this.state.value.trim()) {
      return;
    }
    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={value} onChange={e => this.updateValue(e.target.value)} />
        <button type="submit">Add todo !</button>
      </form>
    );
  }
}
