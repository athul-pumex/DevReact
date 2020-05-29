import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
export default class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newpassword: '',
            confirmpassword: ''
        }
        this.onChange = this.onChange.bind(this)
        this.resetpassword = this.resetpassword.bind(this);

    }
    //login function called on form submit
    resetpassword(event) {
        event.preventDefault();
        event.stopPropagation();
        var newPassword = this.state.newpassword;
        var confirmPassword = this.state.confirmpassword
        if (newPassword !== confirmPassword) {
            toast.info("Password mismatch")
        }
        else {
            var email = new URLSearchParams(this.props.location.search);
            email = email.get("email")
            var body = {}
            var params = {
                "password": this.state.newpassword,
                "email": email
            }
            var headerOption = {
                "headers": {
                    "Content-Type": "application/json"
                }
            }
            axios.post('http://localhost:8080/api/resetPassword', body, {
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

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <form onSubmit={this.resetpassword}> <h3>Reset your password</h3><br></br>
                <div className="form-group">
                    <label>New Password</label>
                    <input name="newpassword" type="password" className="form-control" placeholder="Enter new password" required onChange={this.onChange} /><br></br>
                    <label>Confirm Password</label>
                    <input name="confirmpassword" type="password" className="form-control" placeholder="Confirm new password" required onChange={this.onChange} /><br></br>
                    <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
                    <ToastContainer hideProgressBar={true} position="bottom-center" />
                </div>
            </form>
        );
    }
}