import React, { Component } from 'react';
import './Signup.css';
// import home from './Components/form/home.png';
// function Greet(){
//     return<h1>Hello World</h1>
// }


//Functional component
class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: null,
            email: null,
            password: null,
            phone: null
        }
    }

    register = () => {
        // console.log(this.state)
        fetch("http://localhost:5000/register", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((res)=>{
            res.json().then((result) => {
                // setUser(result)
                console.log(result)
            })
        })
        this.props.history.push('./Login')
    }
    render() {
        return (
            <div>
                <form>
                    <div className="container">
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account.</p>

                        <label htmlFor="email"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" required
                            onChange={(e) => { this.setState({ username: e.target.value }) }}
                        />
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" required
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                        />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                             required

                        />

                        <label htmlFor="email"><b>Phone Number</b></label>
                        <br />
                        {/* <select name="phoneCode" required>
                                        <option selected hidden value="">Code</option>
                                        <option value="66">+98</option>
                                        <option value="66">+99</option>
                                        <option value="66">+90</option>
                                        <option value="66">+66</option>
                                    </select> */}
                        <input type="phone" placeholder="##########" required
                            onChange={(e) => { this.setState({ phone: e.target.value }) }}

                        />

                        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                        <div className="clearfix">

                            <button type="submit" className="btn" onClick={() => { this.register() }}>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Signup;