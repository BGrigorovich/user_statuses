import React from 'react';
import LoginPage from './Login.jsx';
import StatusesPage from './Statuses.jsx';
import axios from 'axios';
import { observer } from 'mobx-react';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

@observer
export default class App extends React.Component {
    render() {
        if (!this.props.store.currentUser.id) {
            return <LoginPage/>;
        } else {
            return <StatusesPage/>;
        }
    }
}
