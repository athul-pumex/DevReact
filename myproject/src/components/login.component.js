import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
                    }, 3000);

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
                <div><ToastContainer hideProgressBar={true} position="bottom-center" /></div>
                <p className="forgot-password text-right">
                    <Link className="nav-link" to={"/forgotPassword"}> Forgot password?</Link>
                </p>
            </form>
        );
    }
}
