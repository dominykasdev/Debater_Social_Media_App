import React from 'react';
import { fetchCommentFeed, updateComment } from '../../actions';
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

    toggleVote = (voteType, value, commentId) => {
        switch (voteType) {
            case "up":
                return (
                    <Icon name='thumbs up' onClick={()=>{this.props.updateComment(commentId, { "likes": 1 })}}>{value}</Icon>
                )
            case "down":
                return (
                    <Icon name='thumbs down' onClick={()=>{this.props.updateComment(commentId, { "dislikes": 1 })}}>{value}</Icon>
                )
        }
    }

    commentFeedList = () => {
        const feedList = [];
        this.props.commentFeed.forEach((item, index) => {
            feedList.push(
                <Comment key={item._id}>
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
                            <Comment.Action>{this.toggleVote("up", item.likes, item._id)}{/*<Icon name='thumbs up' />{item.likes}*/}</Comment.Action>
                            <Comment.Action>{this.toggleVote("down", item.dislikes, item._id)}{/*<Icon name='thumbs down' />{item.dislikes}*/}</Comment.Action>
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
                <Container text>
                    <Segment>
                        <p>This post has no comments</p>
                    </Segment>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { /*'displayName': state.user.displayName,*/ "commentFeed": state.commentFeed }
}

export default connect(mapStateToProps, { fetchCommentFeed, updateComment })(CommentFeed);