import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import './dashboard.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FaStepBackward, FaUsers, FaIdCard, FaStepForward } from "react-icons/fa";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            newUserModal: false,
            email: '',
            fname: '',
            lname: '',
            role: '',
            editUserData: {
                id: '',
                email: '',
                fname: '',
                lname: '',
                role: ''
            },
            editUserModal: false,
            totalUsers: 0,
            limit: 5,
            currentPage: 1,//Users per page
            navigateNo: 1,//navigate button number
            isValid: false,
            isDisabled: false,
            counter: 0
        }
    }


    // componentWillMount() {
    //     this.refreshList()
    // }
    componentDidMount() {
        this.refreshList(this.state.currentPage)
    }

    toggleNewUserModal() {
        this.setState({
            newUserModal: !this.state.newUserModal//to close add user modal
        })
    }
    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal//to close edit user modal
        })
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)
    }
    onChangeEdit(e) {
        // this.setState({ [e.editUserData.target.name]: e.target.value });
        // console.log(this.state.editUserData)
        let { editUserData } = this.state
        editUserData.email = e.target.value
        editUserData.fname = e.target.value
        editUserData.role = e.target.value
        editUserData.lname = e.target.value
        this.setState({ editUserData })
    }
    addUser(event) {
        event.preventDefault();
        event.stopPropagation();

        var body = {}
        var params = {
            "email": this.state.email,
            "password": "Unavailable",
            "firstname": this.state.fname,
            "lastname": this.state.lname,
            "role": this.state.role
        }
        var headerOption = {
            "headers": {
                "Content-Type": "application/json"
            }
        }
        Axios.post('http://localhost:8080/api/saveUserDetails', body, {
            params: params,
            headerOption
        })
            .then((response) => {
                console.log(response);
                if (response.data.message === "User saved successfully") {
                    console.log("hi")
                    toast.info("Submitted successfully")
                    this.setState({
                        newUserModal: !this.state.newUserModal,//to close modal,
                        email: '',
                        fname: '',
                        lname: '',
                        role: ''
                    })
                    // this.componentWillMount();
                    this.refreshList(this.state.currentPage)
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

    editUser(id, fname, lname, email, role) {
        console.log(fname, lname, id)

        this.setState({
            editUserData: { id, fname, lname, email, role },
            editUserModal: !this.state.editUserModal
        })
    }
    updateUser() {
        // event.preventDefault();
        // event.stopPropagation();

        var body = {}
        var params = {
            "email": this.state.editUserData.email,
            "firstname": this.state.editUserData.fname,
            "lastname": this.state.editUserData.lname,
            "role": this.state.editUserData.role,
            "id": this.state.editUserData.id
        }
        var headerOption = {
            "headers": {
                "Content-Type": "application/json"
            }
        }
        Axios.put('http://localhost:8080/api/editUser', body, {
            params: params,
            headerOption
        })
            .then((response) => {
                console.log(response);
                if (response.data.message === "User updated successfully") {
                    // console.log("hi")
                    toast.info(response.data.message)

                }
                else {
                    // toast(response.data.message);
                    toast.info(response.data.message);
                }
                this.refreshList();
                this.setState({
                    editUserModal: false,//to close modal,
                    editUserData: {
                        email: '',
                        fname: '',
                        lname: '',
                        role: ''
                    }
                })

            })
            .catch((error) => {
                toast.info("Something went wrong, Please try again later")
                console.log(error);
            })
    }
    refreshList(currentPage) {
        this.getTotalUserAPI()
        this.getUserListAPI(currentPage)

    }
    getTotalUserAPI() {
        Axios.get("http://localhost:8080/api/getTotalUsers").then((response) => {
            console.log("count=" + response.data)
            this.setState({
                totalUsers: response.data,

            })
        })

    }
    getUserListAPI(currentPage) {
        currentPage = currentPage - 1;
        Axios.get("http://localhost:8080/api/getPaginatedUsers?pageNo=" + currentPage + "&limit=" + this.state.limit).then((response) => {
            this.setState({
                users: response.data

            })
        })
    }

    deleteUser(email) {

        confirmAlert({
            message: 'Are you sure to remove this user ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Axios.delete("http://localhost:8080/api/deleteUser?email=" + email).then((response) => {
                            this.refreshList(this.state.currentPage)

                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }
    navigateStepForward() {
        // let i = this.state.navigateNo
        // i++
        let temp = this.state.currentPage
        // temp = temp - 1
        console.log(temp)
        Axios.get("http://localhost:8080/api/getPaginatedUsers?pageNo=" + temp + "&limit=" + this.state.limit).then((response) => {
            if (response.data.length === 0)
                this.setState({ isDisabled: true })
            else {
                this.setState((prevState) => ({
                    isValid: prevState.isValid = false,
                    currentPage: prevState.currentPage + 1,
                    navigateNo: prevState.navigateNo + 1

                }), () => { //to call at same time (synchronously)
                    console.log(this.state.currentPage);
                    this.refreshList(this.state.currentPage);
                });
            }
        })



    }
    navigateStepbackward() {
        // let i = this.state.navigateNo
        // i++
        this.setState({ isDisabled: false })
        if (this.state.currentPage === 1)
            this.setState((prevState) => ({
                isValid: prevState.isValid = true
            }))
        else {
            this.setState((prevState) => ({
                currentPage: prevState.currentPage - 1,
                navigateNo: prevState.navigateNo - 1


            }), () => { //to call at same time (synchronously)
                console.log(this.state.currentPage);
                this.refreshList(this.state.currentPage);
            });
        }


    }
    render() {

        let users = this.state.users.map((user) => {
            // let counter = this.state.counter
            // this.setState({ counter: counter + 1 })
           
            return (
                <tr key={user.id}>
                    <td></td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editUser.bind(this, user.id, user.firstName, user.lastName, user.email, user.role)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, user.email)}>Delete</Button>
                        {/* <Button color="danger" size="sm" onClick={() => { if (window.confirm('Are you sure you wish to delete this user?')) this.deleteUser.bind(this, user.email) }}>Delete</Button> */}
                    </td>
                </tr>
            )
        })
        return (
            <div className="dash-container">
                <br></br>
                <h3> <FaIdCard className="dash-icon" /> Dashboard</h3>
                <div><Link to="/sign-in">Logout</Link></div>
                <div className="dash-table-container">
                    <div>
                        <div className="userDetails"><h3 >User Details <FaUsers color="white" /></h3></div>
                        <div className="add-user-btn">
                            <Button color="primary" onClick={this.toggleNewUserModal.bind(this)}>Add User</Button>
                        </div>
                        <div className="toatalUsers">Total Users : {this.state.totalUsers}</div>
                    </div>
                    <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)} >
                        <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Add a new user</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>First name</label>
                                <input name="fname" type="text" className="form-control" placeholder="First name" onChange={this.onChange.bind(this)} required />
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input name="lname" type="text" className="form-control" placeholder="Last name" onChange={this.onChange.bind(this)} required />
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" className="form-control" required onChange={this.onChange.bind(this)}>
                                    <option value="" disabled selected>Choose your role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Photographer">Photographer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={this.onChange.bind(this)} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addUser.bind(this)}>Add User</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a user</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>First name</label>
                                <input required name="fname" value={this.state.editUserData.fname} type="text" className="form-control" placeholder="First name" onChange={(e) => {
                                    let { editUserData } = this.state
                                    editUserData.fname = e.target.value
                                    this.setState({ editUserData })
                                }} />
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input name="lname" value={this.state.editUserData.lname} type="text" className="form-control" placeholder="Last name" onChange={(e) => {
                                    let { editUserData } = this.state
                                    editUserData.lname = e.target.value
                                    this.setState({ editUserData })
                                }} required />
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" value={this.state.editUserData.role} className="form-control" required onChange={(e) => {
                                    let { editUserData } = this.state
                                    editUserData.role = e.target.value
                                    this.setState({ editUserData })
                                }} >
                                    <option value="" disabled selected>Choose your role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Photographer">Photographer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input name="email" value={this.state.editUserData.email} type="email" className="form-control" placeholder="Enter email" onChange={(e) => {
                                    let { editUserData } = this.state
                                    editUserData.email = e.target.value
                                    this.setState({ editUserData })
                                }} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateUser.bind(this)}>Update User</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Table striped bordered hover responsive="sm" className="dash-table" size="sm">
                        <thead>
                            <tr>
                                <th>SL.NO</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users}
                        </tbody>
                    </Table>
                    {/* <Button><FaFastBackward color="white" /></Button> */}
                    <Button disabled={this.state.isValid} onClick={this.navigateStepbackward.bind(this)}><FaStepBackward color="white" /></Button>
                    <Button>{this.state.navigateNo}</Button>
                    <Button disabled={this.state.isDisabled} onClick={this.navigateStepForward.bind(this)}><FaStepForward color="white" /></Button>
                    {/* <Button><FaFastForward color="white" /></Button> */}
                    <ToastContainer hideProgressBar={true} position="bottom-center" />
                </div>
            </div>
        )
    }
}
