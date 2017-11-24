import React from 'react';

export default class StatusesPage extends React.Component {
    constructor() {
        super();
        // this.props = {
        //     currentUser: currentUser
        // }
        console.log(this.props)
    }

    render() {
        return <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
                <div className="row">
                    <GreetingHeader/>
                </div>
            </div>
        </div>
    }
}

const GreetingHeader = (props) =>
    <div className="col-sm-12" id="greeting-header">
        {/*Hello { props.currentUser.username }<span*/}
        {/*ng-show="currentUser.status.id"> you are { props.currentUser.status.status }</span>*/}
    </div>;