import React from 'react';
import { fetchPostData, fetchUserData } from '../../actions';
import { connect } from 'react-redux';
import Loader from '../loaderComponents';
import { Grid, Item } from 'semantic-ui-react';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchPostData(this.props.match.params.postId);
    }

    componentDidMount() {

    }

    componentWillUpdate() {

    }

    componentDidUpdate() {
        if (this.props.userId) this.props.fetchUserData(this.props.userId);
    }

    render() {
        if (this.props.displayName) {
            let editTimestamp;
            if (this.props.editTimestamp) editTimestamp = `Last edited on ${this.props.editTimestamp}`;
            return (
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={8}>
                            <Item.Group>
                                <Item>
                                    <div className="ui six wide column centered grid">
                                        <Item.Image size="small" src="https://picsum.photos/200" />
                                        <Item.Header as="a" href={`../user/${this.props.username}`}>{this.props.displayName}</Item.Header>
                                        {/* <Item.Meta>@{this.props.username}</Item.Meta> */}
                                    </div>
                                    <div className="ui left aligned ten wide column grid">
                                        <Item.Header as="h4" className="ui row">{this.props.title}</Item.Header>
                                        <Item.Description as="p" className="ui row">{this.props.body}</Item.Description>
                                        <Item.Extra>Posted on {this.props.timestamp}<br/>
                                        {editTimestamp}
                                        </Item.Extra>
                                    </div>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        } else {
            return (
                <Loader />
            )
        }

    }
}

const mapStateToProps = (state) => {
    return { 'displayName': state.user.displayName, 'username': state.user.username, 'userId': state.post.userId, 'title': state.post.title, 'body': state.post.body, 'timestamp': state.post.timestamp, "editTimestamp": state.post.editTimestamp }
}

export default connect(mapStateToProps, { fetchPostData, fetchUserData })(Post);