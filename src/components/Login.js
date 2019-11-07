import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {loadTodo} from '../actions/todo';
import Register from './Register';
import LoginForm from './LoginForm';
import "../stylesheets/cover.css";

class Login extends Component {
  state = {
    login: true
  }

  handleLoginTab = () => {
    this.setState({
      login: true
    });
  }

  handleRegisterTab = () => {
    this.setState({
      login: false
    });
  }

  handleError = (message) => {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="row align-self-center w-100">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <button className={(!this.state.login ? "btn btn-outline-primary text-primary " : "bg-primary text-white ") + "btn-lg btn-block login text-center"} onClick={this.handleLoginTab} > Login </button>
                </div>
                <div className="col">
                  <button className={(this.state.login ? "btn btn-outline-primary text-primary " : "bg-primary text-white ") + "btn-lg btn-block register text-center"} onClick={this.handleRegisterTab} > Register </button>
                </div>
              </div>
            </div>
            <div className="card-body" id="login-form">
              {
                this.props.message ?
                  this.handleError(this.props.message) : ''
              }
              {this.state.login ? <LoginForm /> : <Register />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.auth.message
})

export default connect(mapStateToProps, null)(Login);