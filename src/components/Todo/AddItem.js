import React, { Component } from 'react';
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { addTodo } from "../../actions/todo";

class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            note: '',
            priority: '',
            isValid: true
        }
    }

    handleTitleChange = (event) => {
        let title = event.target.value;
        if (title.length > 0)
            this.setState({ title, isValid: true });
        else
            this.setState({ title, isValid: false });
    }

    handlePriorityChange = (event) => {
        let priority = event.target.value;
        if (priority.match(new RegExp("^[1-3]$")))
            this.setState({ priority, isValid: true });
        else
            this.setState({ priority, isValid: false });
    }

    handleNoteChange = (event) => {
        let note = event.target.value;
        if (note.length > 0)
            this.setState({ note, isValid: true });
        else
            this.setState({ note, isValid: false });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { title, priority, note, isValid } = this.state;
        if (!isValid) {
            Swal.fire({
                title: "Add Contact Error, Make sure the format is correct",
                timer: 2000,
                type: "error",
                showConfirmButton: false
            });
        }
        else {
            this.props.onSave(title, priority, note);
            this.setState({title: '', note: '', priority: ''})
        }
    }

    handleReturnKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            let button = document.getElementById('submitAdd');
            button.click();
        }
    }

    render() {
        return (
            <div className="card mb-3">
                <h5 className="card-header">Add New Todo</h5>
                <div className="card-body">
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i
                                        className="fas fa-suitcase-rolling "></i></span>
                                </div>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleTitleChange}
                                    required={true} />
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon2"><i
                                        className="fas fa-sticky-note"></i></span>
                                </div>
                                <input
                                    type="text"
                                    id="note"
                                    name="note"
                                    placeholder="Note"
                                    className="form-control"
                                    value={this.state.note}
                                    onChange={this.handleNoteChange}
                                    required={true} />
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon2"><i
                                        className="fas fa-star"></i></span>
                                </div>
                                <input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    className="form-control"
                                    placeholder="Priority"
                                    value={this.state.priority}
                                    onChange={this.handlePriorityChange}
                                    pattern="[1-3]"
                                    required={true} />
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <button type="submit" className="btn btn-success mr-2"><i className="fas fa-check"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSave: (title, priority, note) => { dispatch(addTodo(title, priority, note)) }
});

export default connect(
    null,
    mapDispatchToProps
)(AddTodo);