import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class Clients extends Component {

    constructor(){
        super();
        this.state = {
            totalOwed: null
        }
    }
    //get the clients first and then loop through them to get the total - componentsWillRecieveProps
    static getDerivedStateFromProps(props, state) {
        const { clients } = props;

        if(clients) {
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString());
            }, 0);
            return { totalOwed: total } //setting on the state
        }
        return null;
    }

    render() {
        const { clients } = this.props; //pulling out clients from the props
        const { totalOwed } = this.state;

        if(clients){
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                                {' '}
                                <i className="fas fa-users"> Clients{' '}</i>
                            </h2>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-right text-secondary"> Total Owed{' '}
                                <span id="second">${parseFloat(totalOwed).toFixed(2)}</span>
                            </h5>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>
                                        <span 
                                            className={classnames({ 
                                                'text-danger': client.balance > 0, //red - own money
                                                'text-success': client.balance === 0
                                            })}
                                        >
                                        ${parseFloat(client.balance).toFixed(2)}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/client/${client.id}`} 
                                            className="btn btn-sm text-white" id="details"
                                        >
                                        <i className="fas fa-arrow-circle-right"></i> Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )
        }
        else {
            return <Spinner/>
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients //saving data from the firestore
    }))
)(Clients);