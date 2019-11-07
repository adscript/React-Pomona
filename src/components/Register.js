import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postRegister } from '../actions/auth';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.postRegister(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="text-dark">
        <div className="form-group">
          <label htmlFor="nameForm">Name</label>
          <input
            type="text"
            className="form-control"
            id="nameForm"
            name="name"
            placeholder="Enter Fullname"
            value={this.state.name}
            onChange={this.handleChange}
            required />
        </div>

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

        <button type="submit" className="btn btn-primary btn-register btn-block">Register</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postRegister: userInfo => dispatch(postRegister(userInfo))
})

export default connect(null, mapDispatchToProps)(Register);