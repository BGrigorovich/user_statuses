import React from 'react';
import Websocket from 'react-websocket';
import axios from 'axios';
import { observer } from 'mobx-react';

@observer
export default class StatusesPage extends React.Component {
    constructor() {
        super();

        let component = this;
        axios.get("/statuses/")
            .then(response => {
                component.props.store.statuses = response.data;
            });
        axios.get("/users/")
            .then(response => {
                component.props.store.users = response.data;
            });
    }

    render() {
        return <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
                <div className="row">
                    <GreetingHeader store={this.props.store}/>
                    <UpdateStatusDropdown store={this.props.store}/>
                    <div className="col-sm-12">
                        <hr className="grey-hr"/>
                    </div>
                    <UsersTable store={this.props.store}/>
                </div>
            </div>
        </div>
    }
}

@observer
class UpdateStatusDropdown extends React.Component {
    updateStatus = (e) => {
        let statusId = parseInt(e.target.value);
        axios.post("/change-status/", {userId: this.props.store.currentUser.id, statusId: statusId})
            .then(response => {
                this.props.store.currentUser.status = this.props.store.statuses.filter(status => status.id === statusId);
            });
    };

    render() {
        return <div className="form-group col-sm-6">
            <label>Update My Current Status</label>
            <select className="form-control" onChange={this.updateStatus} value={this.props.store.currentUser.status.id}>
                <option key={0}>---</option>
                {
                    this.props.store.statuses.map(status =>
                        <option value={status.id} key={status.id}> {status.status} </option>)
                }
            </select>
        </div>
    }
}

const GreetingHeader = observer((props) =>
    <div className="col-sm-12">
        Hello {props.store.currentUser.username} <StatusHeader status={props.store.currentUser.status}/>
    </div>
);

const StatusHeader = (props) =>
    props.status.id ? <span> you are {props.status.status}</span> : null;

@observer
class UsersTable extends React.Component {
    handleWSmessage = (data) => {
        let message = JSON.parse(data);
        let userIndex = this.props.store.users.map(user => user.id).indexOf(message.user.id);
        if (userIndex === -1) {
            this.props.store.users.push(message.user)
        } else {
            this.props.store.users[userIndex] = message.user;
        }
    };

    render() {
        return <div className="col-sm-12">
            <div className="row">
                <div className="col-sm-12">
                    <Websocket url={"ws://" + window.location.host + "/users/"}
                               onMessage={this.handleWSmessage}/>
                    <table className="table table-bordered">
                        <tbody>
                        {
                            this.props.store.users.map(user => <UserRow key={user.id} user={user}/>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

const UserRow = (props) => {
    let style = {backgroundColor: '#fff'};
    if (props.user.status) {
        style = {backgroundColor: '#' + props.user.status.color}
    }
    return <tr style={style}>
        <td>{props.user.username} <span>({props.user.status ? props.user.status.status : null})</span></td>
    </tr>;
};