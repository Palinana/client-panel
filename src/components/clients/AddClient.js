import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            balance: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newClient = this.state;
        const { firestore } = this.props;
        //handle balance - if no balance, make 0
        if(newClient.balance === ''){
            newClient.balance = 0;
        }

        //specify collection , actual client 
        firestore.add({ collection: 'clients'}, newClient)
            .then(() => this.props.history.push('/')); //redirect to the main page
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { disableBalanceOnAdd } = this.props.settings;

        return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link" id="second"> 
                        <i className="fas fa-arrow-circle-left" /> Back to Dashboard
                    </Link>
                </div>
            </div>
            <div className="card">
                <div className="card-header">Add Client</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="firstName"
                                minLength="2" //HTML5 validations
                                required
                                onChange={this.onChange}
                                value={this.state.firstName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="lastName"
                                minLength="2" 
                                required
                                onChange={this.onChange}
                                value={this.state.lastName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={this.state.email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="phone"
                                minLength="10" 
                                required
                                onChange={this.onChange}
                                value={this.state.phone}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="balance">Balance</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="balance"
                                onChange={this.onChange}
                                value={this.state.balance}
                                disabled={disableBalanceOnAdd}
                            />
                        </div>
                        <input type="submit" value="Submit" className="btn text-white btn-block" id="main-btn"/>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);