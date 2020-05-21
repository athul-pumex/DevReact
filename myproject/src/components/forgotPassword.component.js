import React, { Component } from "react";

export default class ForgotPassword extends Component {
    render() {
        return (
            <form> <h3>Find your Account</h3><br></br>
                <div className="form-group">
                    <label>Please enter your Email address </label>
                    <input type="email" className="form-control" placeholder="Enter email" /><br></br>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>

        );
    }
}