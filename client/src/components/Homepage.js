import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import Navigation from './Navigation';
import logo from './largelogo.png';
import './Homepage.css';

const logger = console;

class Homepage extends Component {
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

  signUp(event) {
    event.preventDefault();
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        axios
          .post(' https://speech-training.herokuapp.com/api/register', { username: user.email })
          .then(element => { // eslint-disable-line
            logger.log('user created');
            sessionStorage.setItem('username', email);
          })
          .catch(err => {
            logger.log('error saving user: ', err);
          });
        this.setState({
          email: '',
          password: ''
        },()=>{
          this.props.history.push('/listen');
        });

        //this.props.history.push('/listen');
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      // <div className='block'>
      <div className=''>
        <Navigation />
        <div className='auth-form-register'>
          <div className='container-fluid container-auth-register'>
            <Row className='text-center'>
              <Col md={7}>
                <div className='jumbotron desc-register'>
                  <h1 className='main-quote'>
                    Introducing <br />
                    {/* Speech Trainer */}
                  </h1>
                  <br />
                  <img src={logo} className='home-logo' alt='logo'/> 
                  <br />
                  <br />
                  <h3 className='quote'>
                  Helping you take your grammar a notch above
                  </h3>
                </div>
              </Col>
              <Col md={4}>
                <div className='jumbotron login-container-register'>
                  <form onSubmit={this.signUp.bind(this)} className='signup-main'>
                    <FormGroup>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        type='text'
                        placeholder='email'
                        value={this.state.email}
                        onChange={event => this.setState({ email: event.target.value })}
                        className='input-format-register'
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        type='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={event => this.setState({ password: event.target.value })}
                        className='input-format-register'
                      />
                      <div>{this.state.error.message}</div>
                      <div className='text-right'>
                        <button className='btn btn-success btn-sm' type='submit'> Register </button>
                      </div>
                      <h4 className='text-center'>
                      If you already have an acount you can
                        <Link to='/signin' className='redirect-register'> Sign In</Link> here.
                      </h4>
                    </FormGroup>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <h4 className='text-center'>
              <a href="https://www.google.com/chrome/">Please use Google Chrome <br /> as your browser</a>
            </h4>
          </div>
        </div>
        <div className='about-section'>
          <div className='container-fluid about-intro'>
            <div>
              <h2>Welcome to Speech Trainer</h2>
              <hr className='hr-black' />
              <p className='lead lead-custom'>
              Have confidence and make a good impression whenever you want,
              and wherever you are with Speech Training.  With the help of the 
              Speech Training app you can learn English in a better and more 
              effective way. You can enhance your English with correct grammar 
              and positive sentiments.
              </p>
            </div>
          </div>
          <div className='about-func container-fluid'>
            <div className="row about-func-row">
              <div className="col-sm-4 side-image"></div>
              <div className="col-sm-8 about-funct-des-container">
                <div className="container-fluid">
                  <div className="about-func-desc">
                    <h2>What it Does</h2>
                    <hr className='hr-white'/>
                    <p className='lead-custom'>
                      The Speech Training app converts the
                      speech of the user to text and analyzes confidence, sentiment,
                      and provides various options to correct identified grammatical mistakes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
