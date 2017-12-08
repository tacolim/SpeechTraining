import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';
// import ReactDOM from 'react-dom';

const logger = console;

// REVIEW: maybe change button action to click on enter

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    };
  }

  signUp() {
    logger.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        logger.log('this is the user:', user);
        this.setState({
          email: '',
          password: ''
        });
        this.props.history.push('/about');
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div className="form-inline" style={{ margin: '5%' }}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={this.state.email}
            style={{ marginRight: '5px' }}
            placeholder="email"
            onChange={event => this.setState({ email: event.target.value })}
          />
          <input
            className="form-control"
            type="password"
            value={this.state.password}
            style={{ marginRight: '5px' }}
            placeholder="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.signUp()}
          >
            Sign Up
          </button>
        </div>
        <div>
          {this.state.error.message}
        </div>
        <div>
          <Link to={'/signin'}>Already a user? Sign in instead</Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
