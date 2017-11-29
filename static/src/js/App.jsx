import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

import LoginPage from './Login.jsx';
import StatusesPage from './Statuses.jsx';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

@observer
export default class App extends React.Component {
    render() {
        if (!this.props.store.currentUser.id) {
            return <LoginPage store={this.props.store}/>;
        } else {
            return <StatusesPage store={this.props.store}/>;
        }
    }
}
