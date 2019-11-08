import React, { Component } from 'react';
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { editTodo, editOFF } from "../../actions/todo";

class EditTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.todos.title,
            priority: props.todos.priority,
            note: props.todos.note,
            isDone: props.todos.isDone,
            isValid: true
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReturnKey = this.handleReturnKey.bind(this);
    }

    handleTitleChange(event) {
        let title = event.target.value;
        if (title.length > 0)
            this.setState({ title, isValid: true });
        else
            this.setState({ title, isValid: false });
    }

    handlePriorityChange(event) {
        let priority = event.target.value;
        if (priority.match(new RegExp("^([0-3])$")))
            this.setState({ priority, isValid: true });
        else
            this.setState({ priority, isValid: false });
    }

    handleNoteChange(event) {
        let note = event.target.value;
        if (note.length > 0)
            this.setState({ note, isValid: true });
        else
            this.setState({ note, isValid: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        let { title, priority, note, isValid } = this.state;
        if (title === this.props.title && priority === this.props.priority && note === this.props.note) {
            this.props.onCancel();
        }
        else if (!isValid) {
            Swal.fire({
                title: "Update Error, Make sure the format is correct",
                timer: 2000,
                type: "error",
                showConfirmButton: false
            });
            this.props.onCancel();
        }
        else {
            this.props.onSave(title, priority, note);
        }
    }

    handleReturnKey(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            let button = document.getElementById('submitEdit');
            button.click();
        }
    }

    render() {
        return (
            <tr>
                <td>
                    <button type="button" className="btn mr-2" onClick={() => this.props.doneChange(!this.state.isDone)}>
                        {this.state.isDone ? <i className="far fa-check-square text-success"></i> : <i className="far fa-square"></i>}
                    </button>
                </td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                                required={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input
                                type="text"
                                id="note"
                                name="note"
                                className="form-control"
                                value={this.state.note}
                                onChange={this.handleNoteChange}
                                required={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input
                                type="number"
                                id="priority"
                                name="priority"
                                className="form-control"
                                value={this.state.priority}
                                onChange={this.handlePriorityChange}
                                pattern="[0-3]"
                                required={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <button type="submit" className="btn btn-success mr-2" id="submitEdit" onClick={() => this.handleSubmit}><i
                            className="fas fa-check"></i></button>
                        <button type="button" className="btn btn-danger" onClick={() => this.props.onCancel()}> <i className="fas fa-times"></i></button>
                    </form>
                </td>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSave: (title, priority, note) => {
        dispatch(editTodo(ownProps.todos.id, title, priority, note, ownProps.todos.isDone));
        dispatch(editOFF(ownProps.todos.id));
    },
    doneChange: (isDone) => dispatch(editTodo(ownProps.todos.id, ownProps.todos.title, ownProps.todos.priority, ownProps.todos.note, isDone)),
    onCancel: () => dispatch(editOFF(ownProps.todos.id))
});

export default connect(
    null,
    mapDispatchToProps
)(EditTodo);