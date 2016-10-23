import React from 'react';

const ClientCardComponent = React.createClass({
    getInitialState() {
        return {
            client: this.props.client
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState({client: nextProps.client});
    },
    renderSpecialNeeds() {
        if(this.state.client.specialNeeds.length > 0) {
            return (
                <div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h5 className='underline'>Special Needs:</h5>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            {this.state.client.specialNeeds.toString()}
                        </div>
                    </div>
                </div>
            )
        }
    },
    renderResourcesUsed() {
        if(this.state.client.resourcesUsed.length > 0) {
            return (
                <div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h5 className='underline'>Resources Used:</h5>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            {this.state.client.resourcesUsed.toString()}
                        </div>
                    </div>
                </div>
            );
        }
    },
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{this.state.client.name}</h3>
                </div>
                <div className="card-block">
                    <div className='row'>
                        <div className='col-md-12'>
                            <span><h5 className='underline'>Service Start Date: </h5> {this.state.client.serviceStartDate}</span>
                        </div>
                    </div>
                    {this.renderSpecialNeeds()}
                    {this.renderResourcesUsed()}
                </div>
            </div>
        )
    }
});

module.exports = ClientCardComponent;
