import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../index.css'
import Avatar from '../assets/images/avatar.png'
import './login.scss'
import { FaSignInAlt } from "react-icons/fa";


export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.login = this.login.bind(this);
    }

    //login function called on form submit
    login(event) {
        event.preventDefault();
        event.stopPropagation();

        var body = {}
        var params = {
            "email": this.state.email,
            "password": this.state.password
        }
        var headerOption = {
            "headers": {
                "Content-Type": "application/json"
            }
        }
        axios.post('http://localhost:8080/api/getUserByEmailAndPasswords', body, {
            params: params,
            headerOption
        })
            .then((response) => {
                console.log(response);
                if (response.data.message === "Success") {
                    console.log("hi")
                    toast.info("Logged in successsfully")
                    setTimeout(() => {
                        this.props.history.push("/dashboard");
                    }, 1000);

                }
                else {
                    // toast(response.data.message);
                    toast.info(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.info("Something went wrong, Please try again later");
            })

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    // prependBaseUrl(url, corsProxy = false) {
    //     return IS_DEBUG && corsProxy
    //         ? `https://cors-anywhere.herokuapp.com/${BASE_URL}/${url}`
    //         : `${BASE_URL}/${url}`;dashboard.component
    // }

    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}><strong>MyWebsite.com</strong></Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}><strong>Sign In</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}><strong>Sign Up</strong></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.login}>
                            <div className="avatar-container"> <img className="avatar" src={Avatar} alt="Avatar" /></div><br></br>
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

                            <button type="submit" className="btn btn-primary btn-block" >Log In <FaSignInAlt /></button>
                            <div><ToastContainer hideProgressBar={true} position="bottom-center" /></div>
                            <p className="forgot-password text-right">
                                <Link className="nav-link" to={"/forgotPassword"}> Forgot password?</Link>
                            </p>
                        </form>
                    </div></div>

            </div>
        );
    }
}
