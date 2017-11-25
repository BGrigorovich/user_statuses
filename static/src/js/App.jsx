import React from 'react';
import LoginPage from './Login.jsx';
import StatusesPage from './Statuses.jsx';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: {
                id: null,
                username: null,
                status: {
                    id: null,
                    status: null,
                    color: null
                }
            }
        }
    }

    updateCurrentUser = (user) => {
        this.setState({currentUser: user});
    };

    render() {
        if (!this.state.currentUser.id) {
            return <LoginPage updateCurrentUser={this.updateCurrentUser}/>;
        } else {
            return <StatusesPage currentUser={this.state.currentUser}/>;
        }
    }
}
