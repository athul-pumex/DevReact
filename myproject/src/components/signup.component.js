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
            role: '',
            required: true,
            // Initially, no file is selected 
            selectedFile: null,

        }
        this.onChange = this.onChange.bind(this)
        this.signup = this.signup.bind(this);
        this.onFileChange = this.onFileChange.bind(this)

    }
    aa = () => {
        console.log("hii")
    }
    // On file select (from the pop up) 
    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
    };
    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "avatar",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        // Send formData object 
        axios.post("http://localhost:3001/users/upload-avatar", formData);

    }
    //login function called on form submit
    signup(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.fname === '') {
            this.setState({ required: false })
            return
        }

        var body = {}
        var params = {
            "email": this.state.email,
            "password": this.state.password,
            "firstname": this.state.fname,
            "lastname": this.state.lname,
            "role": this.state.role
        }
        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "avatar",
            this.state.selectedFile,

        );
        var headerOption = {
            "headers": {
                // "Content-Type": "application/json"
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post('http://localhost:3001/users/saveUser', formData, {
            params: params,
            headerOption
        })
            .then((response) => {
                console.log(response);
                if (response.data.message === "User saved successfully") {
                    // this.onFileUpload()
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
                                <label>First name  <span className="color-red ">*</span></label>
                                <input name="fname" type="text" className="form-control" placeholder="First name" onChange={this.onChange} required />
                            </div>

                            <div className="form-group">
                                <label>Last name  <span className="color-red ">*</span></label>
                                <input name="lname" type="text" className="form-control" placeholder="Last name" onChange={this.onChange} required />
                            </div>

                            <div className="form-group">
                                <label>Role  <span className="color-red ">*</span></label>
                                <select name="role" className="form-control" required onChange={this.onChange}>
                                    <option value="" disabled selected>Choose your role</option>
                                    {/* <option value="Admin">Admin</option> */}
                                    <option value="Customer">Customer</option>
                                    <option value="Photographer">Photographer</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Email address  <span className="color-red ">*</span></label>
                                <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Password  <span className="color-red ">*</span></label>
                                <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Add picture</label>
                                <input name="avatar" type="file" accept=".png,.jpeg" className="form-control" placeholder="Insert your picture" onChange={this.onFileChange} />
                                <span style={{ "fontSize": "14px", color: "grey" }}>Allowed formats : *png, *jpeg</span>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <ToastContainer hideProgressBar={true} position="bottom-center" timeOut="2000" />
                            <p className="forgot-password text-right">
                                <Link className="sign-in" to={"/sign-in"}>Sign in?</Link>
                            </p>
                            <label className="color-red " style={{ fontSize: "14px" }}>All fields marked in * are mandatory.</label>
                        </form></div></div>
            </div>
        );
    }
}