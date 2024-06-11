import React, { Component } from "react";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Add Todo",
      inputText: "",
      date: "",
      todo: [],
      currentEditId: 0,
    };
  }

  handleText(val, type) {
    const value = val.target.value;
    this.setState({
      [type]: value,
    });
  }

  handleAddTodo(e) {
    e.preventDefault();
    const { inputText, date, todo, buttonText, currentEditId } = this.state;
    if (buttonText === "Update Todo") {
      const todoItems = todo.map((ele) =>
        ele.id === currentEditId
          ? { ...ele, todoText: inputText, todoDate: date }
          : ele
      );
      this.setState({
        buttonText: "Add Todo",
        todo: todoItems,
      });
    } else {
      const temp = [];
      temp.push({ id: todo.length, todoText: inputText, todoDate: date });
      this.setState({
        buttonText: "Add Todo",
        todo: [...todo, ...temp],
      });
    }
  }

  handleDelete(id) {
    const temp = this.state.todo.filter((ele) => ele.id !== id);
    this.setState({
      todo: temp,
    });
  }

  handleEdit(id) {
    const item = this.state.todo.filter((ele) => ele.id === id);
    this.setState({
      inputText: item[0].todoText,
      date: item[0].todoDate,
      buttonText: "Update Todo",
      currentEditId: id,
    });
  }

  render() {
    return (
      <div className="todo-container">
        <form onSubmit={(e) => this.handleAddTodo(e)}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Enter todo"
              value={this.state.inputText}
              onChange={(e) => this.handleText(e, "inputText")}
              required
            />
            <input
              type="date"
              placeholder="enter date"
              value={this.state.date}
              onChange={(e) => this.handleText(e, "date")}
              required
            />
            <button
              type="submit"
              className={this.state.buttonText === "Add Todo" ? "add-todo" : "update-todo"}
            >
              {this.state.buttonText}
            </button>
          </div>
        </form>
        {this.state.todo.length > 0 && (
          <table border={1}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Todo Text</th>
                <th>Todo Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todo.map((ele, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ele.id + 1}</td>
                    <td>{ele.todoText}</td>
                    <td>{ele.todoDate}</td>
                    <td>
                      <button className="update-todo-cell" onClick={() => this.handleEdit(ind)}>
                        {" "}
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="delete-todo-cell" onClick={() => this.handleDelete(ele.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
