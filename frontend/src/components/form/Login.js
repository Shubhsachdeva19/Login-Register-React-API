import React, { Component } from "react";
import './Login.css';
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: null,
            password: null
        }
    }
    login() {
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            res.json().then((result) => {
                // alert("User successfully registered")
                console.log(result)
            })
        })
        this.props.history.push('./welcome')
    }
    render() {
        return (

            <div>
                <form>
                    <div className="container">
                        <h1>Login</h1>
                        <p>Please fill in this form to Login to your account.</p>

                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" onChange={(e) => { this.setState({ email: e.target.value }) }} required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" onChange={(e) => { this.setState({ password: e.target.value }) }} required />

                        <br />
                        {/* <select name="phoneCode" required>
                                        <option selected hidden value="">Code</option>
                                        <option value="66">+98</option>
                                        <option value="66">+99</option>
                                        <option value="66">+90</option>
                                        <option value="66">+66</option>
                                    </select> */}

                        <p>Don't have an account? Please click on <a href="#signup">Signup</a>.</p>

                        <div className="clearfix">

                            <button type="submit" className="btn" onClick={() => {this.login()}}>Login</button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default Login;