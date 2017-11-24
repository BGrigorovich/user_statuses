import React from 'react';
import LoginPage from './Login.jsx';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends React.Component {
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
        return <div><LoginPage updateCurrentUser={this.updateCurrentUser}/></div>;
    }
}

export default App