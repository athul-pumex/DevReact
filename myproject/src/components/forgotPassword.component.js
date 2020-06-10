import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
        this.onChange = this.onChange.bind(this)
        this.forgotpasswordsendmail = this.forgotpasswordsendmail.bind(this);

    }
    //login function called on form submit
    forgotpasswordsendmail(event) {
        event.preventDefault();
        event.stopPropagation();

        var body = {}
        var params = {
            "email": this.state.email,
        }
        var headerOption = {
            "headers": {
                "Content-Type": "application/json"
            }
        }
        axios.post('http://localhost:8080/api/forgotPassword', body, {
            params: params,
            headerOption
        })
            .then((response) => {
                console.log(response);
                if (response.data.status === true) {
                    console.log("hi")
                    toast.info(response.data.message)
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
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.forgotpasswordsendmail}> <h3>Find your Account</h3><br></br>
                        <div className="form-group">
                            <label>Please enter your Email address </label>
                            <input name="email" type="email" className="form-control" required placeholder="Enter email" onChange={this.onChange} /><br></br>
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            <ToastContainer hideProgressBar={true} position="bottom-center" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}