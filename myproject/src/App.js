import React from 'react';
import './App.css'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
function App() {
  return (
    <div className="Container">
      <form className="login-form">
        <h1 className="white-color"><span className="font-weight-bold white-color">MyWebsite</span>.com</h1>
        <h2 className="text-center white-color">Welcome</h2>
        <FormGroup>
          <label className="white-color">Email</label>
          <Input type="email" placeholder="Email" />
          <label className="white-color">Password</label>
          <Input type="password" placeholder="Password" />
        </FormGroup>
        <Button className="btn-lg btn-secondary btn-block">Log in</Button><br></br>
        <div className="text-center white-color">
          <a href="/sign-up">Sign up</a>
          <span className="p-2">|</span>
          <a href="/forgot-password">Forgot password</a>
        </div>
      </form>

    </div>

  );
}

export default App;
