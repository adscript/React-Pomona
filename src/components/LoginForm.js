import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postLogin } from '../actions/auth';
// import "../stylesheets/cover.css";

class LoginForm extends Component {
    state = {
        email: "",
        password: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.postLogin(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="text-dark">
                <div className="form-group">
                    <label htmlFor="emailForm">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="emailForm"
                        name="email"
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="passwordForm">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="passwordForm"
                        name="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required />
                </div>

                <button type="submit" className="btn btn-primary btn-login btn-block">Login</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    postLogin: userInfo => dispatch(postLogin(userInfo))
})

export default connect(null, mapDispatchToProps)(LoginForm);