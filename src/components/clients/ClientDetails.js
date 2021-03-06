import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {
    constructor() {
        super();
        this.state = {
            showBalanceUpdate: false,
            balanceUpdateAmount: ''
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    //Update balance
    balanceSubmit = e => {
        e.preventDefault();

        const { balanceUpdateAmount } = this.state;
        const { client, firestore } = this.props; 
        //what to update for this perticular client
        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }
        //update in firestore
        firestore.update({ collection: 'clients', doc: client.id}, clientUpdate);
    }

    //Delete client
    onDeleteClick = () => {
        const { client, firestore } = this.props;

        firestore.delete({ collection: 'clients', doc: client.id})
            .then(this.props.history.push('/'));
    }

    render() {
        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;
        let balanceForm = '';

        //if balance form should display
        if(showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control"
                            name="balanceUpdateAmount"
                            placeholder="Add New Balance"
                            value={balanceUpdateAmount}
                            onChange={this.onChange}
                        />
                        <div className="input-group-append">
                            <input type="submit" value="Update" className="btn btn-outline-dark"/>
                        </div>
                    </div>
                </form>
            )
        }
        else {
            balanceForm = null;
        }

        if(client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link" id="second"> 
                                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`}
                                    className="btn btn-dark"
                                > Edit
                                </Link>
                                <button className="btn btn-danger" onClick={this.onDeleteClick}>Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="card">
                        <h3 className="card-header">
                            {client.firstName} {client.lastName}
                        </h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h4>Client ID:{' '}<span className="text-secondary">{client.id}</span></h4>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h3 className="pull-right">Balance: {' '}
                                        <span 
                                            className={classnames({ 
                                                'text-danger': client.balance > 0, //red - own money
                                                'text-success': client.balance === 0
                                            })}
                                        >
                                            ${parseFloat(client.balance).toFixed(2)}
                                        </span>
                                        {' '}
                                        <small>
                                            <a href="#!" onClick={() => this.setState({ showBalanceUpdate: !showBalanceUpdate })}>
                                                <i className="fas fa-pencil-alt" id="second"></i>
                                            </a>
                                        </small>
                                    </h3>
                                    {balanceForm}
                                </div>
                            </div>
                        <hr/>
                        <ul className="list-group">
                            <li className="list-group-item">Contact Email: <span className="text-secondary">{client.email}</span></li>
                            <li className="list-group-item">Conatct Phone: <span className="text-secondary">{client.phone}</span></li>
                        </ul>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return <Spinner/>
        }
        
    }
}

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [   //getting a single client by passing props with ID in URL
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }  //storing as client as it should not be the same name on state
    ]), 
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);
