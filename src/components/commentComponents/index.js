import React from 'react';
import { fetchCommentFeed } from '../../actions';
import { connect } from 'react-redux';
import Loader from '../loaderComponents';
import { Icon, Container, Segment, Comment } from 'semantic-ui-react';

class CommentFeed extends React.Component {
    constructor(props) {
        super(props);
        this.props.postId ? this.props.fetchCommentFeed(this.props.postId) : this.props.fetchCommentFeed(this.props.user);
    }

    componentDidUpdate() {
        // if (this.props.username) this.props.fetchUserData(this.props.username);
    }

    commentFeedList = () => {
        const feedList = [];
        this.props.commentFeed.forEach((item, index) => {
            feedList.push(
                <Comment>
                    <Comment.Avatar as='a' href={`../user/${item.username}`} src="https://picsum.photos/200" />
                    <Comment.Content>
                        <Comment.Author as="a" href={`../user/${item.username}`}>{item.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>{item.timestamp}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>
                                {item.content}
                            </p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            <Comment.Action><Icon name='thumbs up' /></Comment.Action>{item.likes}
                            <Comment.Action><Icon name='thumbs down' /></Comment.Action>{item.dislikes}
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

            );
        });
        return (
            <Comment.Group>
                {feedList}
            </Comment.Group>
        )
    }

    render() {
        if (this.props.commentFeed.length) {
            return (
                <Container text>
                    <Segment>
                        {this.commentFeedList()}
                    </Segment>
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
    return { /*'displayName': state.user.displayName,*/ "commentFeed": state.commentFeed }
}

export default connect(mapStateToProps, { fetchCommentFeed })(CommentFeed);