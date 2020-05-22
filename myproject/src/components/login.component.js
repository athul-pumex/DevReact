import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PostData } from "../services/PostData"

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    //login function called on form submit
    login() {
        // event.preventDefault();
        // event.stopPropagation();
        console.log("hi login works")
        PostData('getUserByEmailAndPassword', this.state).then((result) => {
            let responseJSON = result;
            console.log(responseJSON);
        })
        console.log("hello")

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
