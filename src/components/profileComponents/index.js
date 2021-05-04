import React from 'react';
import { fetchUserData } from '../../actions';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        fetchUserData(this.props.match.params.username);
    }

    render() {
        if (this.props.match.params.username) {
            return (
                <div>Hello world!</div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { 'name': state.user.displayName, 'name': state.user.username, 'description': state.user.description, 'status': state.user.status }
}

export default connect(mapStateToProps, { fetchUserData })(UserProfile);