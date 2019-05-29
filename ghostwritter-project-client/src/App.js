import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Navbar from  './components/Navbar';
import Login from './components/Login';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Chat from "./components/Chat";


class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Switch>
                <Route exact path='/'  component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/chat/:chatId' component={Chat}/>
            </Switch>




        </div>

        </Router>


    );
  }
}

export default App;



