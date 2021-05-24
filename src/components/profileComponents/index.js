import React from 'react';
import { fetchUserData } from '../../actions';
import { connect } from 'react-redux';
import { Container, Item } from 'semantic-ui-react';
import Loader from '../loaderComponents';
import PostFeed from '../postComponents/postFeed';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchUserData(this.props.match.params.username);
    }
    componentDidMount() {

    }

    render() {
        if (this.props.username) {
            return (
                <Container>
                    <Item>
                        <Item.Image size="small" src="https://picsum.photos/200" />
                        <Item.Content>
                            <Item.Header>{this.props.displayName}</Item.Header>
                            <Item.Meta>@{this.props.username}</Item.Meta>
                            {/* <Item.Meta>@{this.props.userJoined}</Item.Meta> */}
                            <Item.Description>{this.props.description}</Item.Description>
                        </Item.Content>
                    </Item>
                    <PostFeed user={this.props.match.params.username} />
                </Container>
            )
        } else {
            return (
                <Loader />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { 'displayName': state.user.displayName, 'username': state.user.username, 'description': state.user.description, 'status': state.user.status }
}

export default connect(mapStateToProps, { fetchUserData })(UserProfile);