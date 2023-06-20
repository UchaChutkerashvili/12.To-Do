import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      toDoList: [],
      doneList: []
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleAddToDo = () => {
    const { inputValue, toDoList } = this.state;
    if (inputValue !== '') {
      const newToDo = {
        id: Date.now(),
        text: inputValue
      };

      this.setState({
        toDoList: [...toDoList, newToDo],
        inputValue: ''
      });
    }
  };

  handleMarkDone = (id) => {
    const { toDoList, doneList } = this.state;
    const doneWork = toDoList.find(item => item.id === id);
    this.setState({
      doneList: [...doneList, doneWork],
      toDoList: toDoList.filter(item => item.id !== id)
    });
  };

  handleDeleteToDo = (id) => {
    const { toDoList } = this.state;
    this.setState({
      toDoList: toDoList.filter(item => item.id !== id)
    });
  };

  handleDeleteDone = (id) => {
    const { doneList } = this.state;
    this.setState({
      doneList: doneList.filter(item => item.id !== id)
    });
  };

  handleMoveToToDo = (id) => {
    const { doneList, toDoList } = this.state;
    const toDoWork = doneList.find(item => item.id === id);
    this.setState({
      toDoList: [...toDoList, toDoWork],
      doneList: doneList.filter(item => item.id !== id)
    });
  };

  render() {
    const { inputValue, toDoList, doneList } = this.state;

    return (
      <div className="App">
        <div>
          <h2>Unfinished Tasks</h2>
          <input
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
            placeholder="Enter a task..."
          />
          <button onClick={this.handleAddToDo}>Add</button>
          <ul>
            {toDoList.map(item => (
              <li key={item.id}>
                {item.text}
                <button onClick={() => this.handleMarkDone(item.id)}>Done</button>
                <button onClick={() => this.handleDeleteToDo(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Finished Tasks</h2>
          <ul>
            {doneList.map(item => (
              <li key={item.id}>
                {item.text}
                <button onClick={() => this.handleMoveToToDo(item.id)}>Move to To Do</button>
                <button onClick={() => this.handleDeleteDone(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
