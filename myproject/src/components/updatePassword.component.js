import React, { Component } from "react";

export default class UpdatePassword extends Component {
    render() {
        return (
            <form> <h3>Reset your password</h3><br></br>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" placeholder="Enter new password" required="true" /><br></br>
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm new password" /><br></br>
                    <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
                </div>
            </form>
        );
    }
}