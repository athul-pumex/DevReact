import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        // this.login = this.login.bind(this)
        this.onChange = this.onChange.bind(this)
        this.login = this.login.bind(this);
    }
    // Email(event) {
    //     this.setState({ Email: event.target.value })
    // }
    // Password(event) {
    //     this.setState({ Password: event.target.value })
    // }
    //login function called on form submit
    login(event) {
        event.preventDefault();
        event.stopPropagation();
        // console.log("hi login works")
        // PostData('getUserByEmailAndPassword', this.state).then((result) => {
        //     let responseJSON = result;
        //     console.log(responseJSON);
        // })
        // axios.post('/http://localhost:8080/api/getUserByEmailAndPassword', {
        //     email: e.email.value,
        //     password: e.password.value
        // })
        //     .then((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.log(error);
        //     });

        // axios.post('http://localhost:8080/api/getUserByEmailAndPasswords', {
        //     params: {
        //         email: 'athul4040@gmail.com',
        //         password: '123'
        //     },
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.log(error);
        //     });

        axios.post('http://localhost:8080/api/getUserByEmailAndPasswords', {
            params: {
                email: 'athul4040@gmail.com',
                password: '123'
                
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.login}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" placeholder="Enter email" required onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" required title="Please enter the Password" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                <p className="forgot-password text-right">
                    <Link className="nav-link" to={"/forgotPassword"}> Forgot password?</Link>
                </p>
            </form>
        );
    }
}
