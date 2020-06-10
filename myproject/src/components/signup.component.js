import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: '',
            role: ''

        }
        this.onChange = this.onChange.bind(this)
        this.signup = this.signup.bind(this);

    }
    //login function called on form submit
    signup(event) {
        event.preventDefault();
        event.stopPropagation();

        var body = {}
        var params = {
            "email": this.state.email,
            "password": this.state.password,
            "firstname": this.state.fname,
            "lastname": this.state.lname,
            "role": this.state.role
        }
        var headerOption = {
            "headers": {
                "Content-Type": "application/json"
            }
        }
        axios.post('http://localhost:8080/api/saveUserDetails', body, {
            params: params,
            headerOption
        })
            .then((response) => {
                console.log(response);
                if (response.data.message === "User saved successfully") {
                    console.log("hi")
                    toast.info("Submitted successfully")
                    setTimeout(() => {
                        this.props.history.push("/sign-in");
                    }, 3000);

                }
                else {
                    // toast(response.data.message);
                    toast.info(response.data.message);
                }
            })
            .catch((error) => {
                toast.info("Something went wrong, Please try again later")
                console.log(error);
            })

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}><strong>MyWebsite.com</strong></Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}><strong>Login</strong></Link>
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
                        <form onSubmit={this.signup}>
                            <h3>Sign Up</h3>

                            <div className="form-group">
                                <label>First name</label>
                                <input name="fname" type="text" className="form-control" placeholder="First name" onChange={this.onChange} required />
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input name="lname" type="text" className="form-control" placeholder="Last name" onChange={this.onChange} required />
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" className="form-control" required onChange={this.onChange}>
                                    <option value="" disabled selected>Choose your role</option>
                                    {/* <option value="Admin">Admin</option> */}
                                    <option value="Customer">Customer</option>
                                    <option value="Photographer">Photographer</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={this.onChange} />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <ToastContainer hideProgressBar={true} position="bottom-center" timeOut="2000" />
                            <p className="forgot-password text-right">
                                <Link className="sign-in" to={"/sign-in"}>Sign in?</Link>
                            </p>
                        </form></div></div>
            </div>
        );
    }
}