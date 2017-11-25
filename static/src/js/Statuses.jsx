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
            .then(function (response) {
                component.setState({
                    statuses: JSON.parse(response.data).map(status => {
                        return {
                            id: status.pk,
                            status: status.fields.status,
                            color: status.fields.color
                        }
                    })
                })
            });

        axios.get("/users/")
            .then(function (response) {
                component.setState({
                    users: JSON.parse(response.data).map(user => {
                        return {
                            id: user.pk,
                            username: user.fields.username,
                            status: component.state.statuses.filter(status => {status.id == user.fields.status})[0]
                        }
                    })
                })
            });
    }

    handleWSmessage = (data) => {

    };

    updateStatus = () => {
    };

    render() {
        return <div className="row">
            <Websocket url={"ws://" + window.location.host + "/users/"}
                       onMessage={this.handleWSmessage}/>
            <div className="col-sm-offset-3 col-sm-6">
                <div className="row">
                    <GreetingHeader currentUser={this.props.currentUser}/>
                    <UpdateStatusDropdown currentUser={this.props.currentUser} statuses={this.state.statuses}/>
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
                    this.props.statuses.map(status => <option value={status.id} key={status.id}> {status.status} </option>)
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