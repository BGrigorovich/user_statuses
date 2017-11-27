import React from 'react';
import Websocket from 'react-websocket';
import axios from 'axios';

export default class StatusesPage extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            statuses: []
        };

        let component = this;
        axios.get("/statuses/")
            .then(response => {
                component.setState({statuses: response.data});
            });
        axios.get("/users/")
            .then(response => {
                component.setState({users: response.data})
            });
    }

    handleWSmessage = (data) => {

    };

    updateStatus = () => {
        axios.post("/change-status/", {userId: this.props.currentUser.id, statusId: this.props.currentUser.status.id})
    };

    render() {
        return <div className="row">
            <Websocket url={"ws://" + window.location.host + "/users/"}
                       onMessage={this.handleWSmessage}/>
            <div className="col-sm-offset-3 col-sm-6">
                <div className="row">
                    <GreetingHeader currentUser={this.props.currentUser}/>
                    <UpdateStatusDropdown currentUser={this.props.currentUser}
                                          statuses={this.state.statuses}
                                          updateStatus={this.updateStatus}/>
                    <div className="col-sm-12">
                        <hr className="grey-hr"/>
                    </div>
                    <UsersTable users={this.state.users} statuses={this.state.statuses}/>
                </div>
            </div>
        </div>
    }
}

class UpdateStatusDropdown extends React.Component {
    render() {
        return <div className="form-group col-sm-6">
            <label>Update My Current Status</label>
            <select className="form-control" onChange={this.props.updateStatus}>
                {
                    this.props.statuses.map(status => <option value={status.id}
                                                              key={status.id}> {status.status} </option>)
                }
            </select>
        </div>
    }
}

const GreetingHeader = (props) =>
    <div className="col-sm-12">
        Hello {props.currentUser.username} <StatusHeader status={props.currentUser.status}/>
    </div>;

const StatusHeader = (props) =>
    props.status.id ? <span> you are {props.status.status}</span> : null;

class UsersTable extends React.Component {
    render() {
        return <div className="col-sm-12">
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-bordered">
                        <tbody>
                        {
                            this.props.users.map(user => <UserRow key={user.id} user={user}/>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

const UserRow = (props) =>
    <tr style={{backgroundColor: '#' + props.user.status === null ? 'fff' : props.user.status.color}}>
        <td>{props.user.username} <span>({props.user.status ? props.user.status.status : null})</span></td>
    </tr>;