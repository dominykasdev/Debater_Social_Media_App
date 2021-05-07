import React from 'react';
import { fetchPostData, fetchUserData } from '../../actions';
import { connect } from 'react-redux';
import Loader from '../loaderComponents';
import { Container, Item } from 'semantic-ui-react';
import CommentFeed from '../commentComponents';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchPostData(this.props.match.params.postId);
    }

    componentDidUpdate() {
        if (this.props.userId) this.props.fetchUserData(this.props.userId);
    }

    render() {
        if (this.props.displayName) {
            let editTimestamp;
            if (this.props.editTimestamp) editTimestamp = `Last edited on ${this.props.editTimestamp}`;
            return (
                <Container text>
                        <Item.Group>
                            <Item className="post">
                            <Item.Image size="tiny" bordered rounded src="https://picsum.photos/200" />
                                <Item.Content className="postContent">
                                    {/* <Item.Image size="mini" bordered circular src="https://picsum.photos/200" /> */}
                                    <Item.Header as="a" href={`../user/${this.props.username}`}> {this.props.displayName}</Item.Header>
                                    <Item.Meta as="a" href={`../user/${this.props.username}`}> @{this.props.username}</Item.Meta><br />
                                    <Item.Header as="h4" className="ui row">{this.props.title}</Item.Header>
                                    <Item.Content as="p" className="ui row">{this.props.body}</Item.Content>
                                    <Item.Extra>Posted on {this.props.timestamp}<br />
                                        {editTimestamp}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                        <CommentFeed postId={this.props.match.params.postId} />
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
    return { 'displayName': state.user.displayName, 'username': state.user.username, 'userId': state.post.userId, 'title': state.post.title, 'body': state.post.body, 'timestamp': state.post.timestamp, "editTimestamp": state.post.editTimestamp, "likes": state.post.likes, "dislikes": state.post.dislikes }
}

export default connect(mapStateToProps, { fetchPostData, fetchUserData })(Post);