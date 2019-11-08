import React, { Component } from 'react';
import ItemTable from './ItemTable';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import {logoutSuccess} from '../../actions/auth';
import {loadTodos} from '../../actions/todo';
import {connect} from 'react-redux';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onAdd: false
        }
    }

    handleAddButton = (event) => {
        event.preventDefault();
        this.setState(state => ({
            onAdd: !state.onAdd
        }));
    }

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        this.props.logoutSuccess();
        this.props.loadTodos();
    }

    render() {
        return (
            <div className="container">
                <div className="card my-5">
                    <div className="card-header">
                        <div className="row justify-content-between">
                            <h1 className="ml-5 text-left">Todo Apps</h1>
                            <button type="button" className="btn btn-primary mr-5" onClick={this.handleLogout}>Logout</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-between">
                            <div className="text-left col">
                                <button type="button" className="btn btn-outline-dark mb-4" onClick={this.handleAddButton}>{
                                    this.state.onAdd ? <span><i className="fas fa-times"></i> Cancel</span> : <span><i className="fas fa-plus"></i> Add</span>
                                } </button>
                            </div>
                            <div className="text-right col">
                                {/* search box */}
                                <SearchItem />
                            </div>
                        </div>

                        {(this.state.onAdd) ? <AddItem /> : ''}

                        <ItemTable />

                    </div>
                    <div className="card-footer text-center text-muted">
                        <i className="far fa-copyright"></i> Adnan Radja Maulana 2019
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logoutSuccess: () => dispatch(logoutSuccess()),
    loadTodos: () => dispatch(loadTodos())
  })
export default connect(null, mapDispatchToProps)(Main);
