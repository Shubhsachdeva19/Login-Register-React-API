import logo from './logo.svg';
import home from './home-button-icon.jpg';
import './App.css';
// import Home from './components/form/Home'
import Signup from './components/form/Signup';
import Login from './components/form/Login';
import welcome from './components/form/welcome';
// import Welcome from './components/form/welcome/Welcome';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

function App() {
  return (
    <div>
      {/* <div className="homejpg">
        <img src={home} />
      </div> */}
    <div className="wrapper">
      
    <div className="link_wrapper">
        <Router>
        <Link to="/Signup" class="a btn-2">Register</Link>
        <p>|</p>
        <Link to="/Login" class="a btn-5">Login</Link>
        {/* <Link to="/welcome">abcd</Link> */}

        <switch>
                    <Route path='/Signup' component={Signup} />
                    <Route path='/Login' component={Login} />
                    <Route path="/welcome" component={welcome} />
                </switch>
        </Router>
    </div>

</div>
      // {/* <Welcome /> */}
      
      // {/* <Signup /> */}
      // {/* <Login /> */}
      </div>
  )
}

export default App;
