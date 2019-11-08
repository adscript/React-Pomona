import React, { Component } from 'react';
import { connect } from "react-redux";
import { editON, deleteTodo, editTodo } from "../../actions/todo";

class todoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: props.todos.isDone
        }
    }

    handleDone = () => {
        this.setState({ isDone: !this.state.isDone }, () => {
            this.props.doneChange(this.state.isDone);
        });
    }

    render() {
        let { title, priority, note } = this.props.todos;
        const stars = (priority) => [...Array(3)].map((item, index) => {
            return (
                    index < priority ?
                    <i className="fas fa-star text-warning"></i> : 
                    <i className="far fa-star text-warning"></i>
            )
        })
        return (
            <tr>
                <td>
                    <button type="button" className="btn mr-2" onClick={() => this.handleDone()}>
                        {this.state.isDone ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>}
                    </button>
                </td>
                <td className="text-left">{title}</td>
                <td>{note}</td>
                <td className="text-center">{stars(priority)}</td>
                <td>
                    <div>
                        <button type="button" className="btn btn-success mr-2" onClick={() => this.props.editON()}><i
                            className="fas fa-pencil-alt" ></i></button>
                        <button type="button" className="btn btn-danger" onClick={() => this.props.deleteTodo()}><i className="fas fa-trash"></i></button>
                    </div>

                </td>
            </tr>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    editON: () => dispatch(editON(ownProps.todos.id)),
    deleteTodo: () => dispatch(deleteTodo(ownProps.todos.id, ownProps.todos.title, ownProps.todos.priority, ownProps.todos.note, ownProps.todos.isDone)),
    doneChange: (isDone) => dispatch(editTodo(ownProps.todos.id, ownProps.todos.title, ownProps.todos.priority, ownProps.todos.note, isDone))
});

export default connect(
    null,
    mapDispatchToProps
)(todoItem);