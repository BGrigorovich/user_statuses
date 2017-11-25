import React from 'react';
import axios from 'axios';

export default class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: ''
        }
    }

    updateUsername = (e) => {
        this.setState({username: e.target.value})
    };

    login = (e) => {
        axios.post("/login/", {username: this.state.username})
            .then(response => {
                this.props.updateCurrentUser(response.data);
            });
    };

    render() {
        return <div className="row">
            <GreetingLabel/>
            <UsernameInput updateUsername={this.updateUsername.bind(this)}/>
            <LoginButton login={this.login.bind(this)}/>
        </div>
    }
}

const GreetingLabel = (props) =>
    <div className="text-center" id="login-header">Welcome to MyWorkStatus</div>;

const UsernameInput = (props) =>
    <div className="col-sm-offset-3 col-sm-4">
        <input type="text" onChange={props.updateUsername} className="form-control"/>
    </div>;

const LoginButton = (props) =>
    <div className="col-sm-2">
        <button className="form-control" onClick={props.login}>Login</button>
    </div>;
