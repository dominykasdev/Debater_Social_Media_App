import React from 'react';
import { fetchPostFeed } from '../../actions';
import { connect } from 'react-redux';
import Loader from '../loaderComponents';
import { Grid, Feed, Icon } from 'semantic-ui-react';

class PostFeed extends React.Component {
    constructor(props) {
        super(props);
        this.props.user ? this.props.fetchPostFeed(this.props.user) : this.props.fetchPostFeed();
    }

    componentDidUpdate() {
        // if (this.props.username) this.props.fetchUserData(this.props.username);
    }

    postFeedList = () => {
        const feedList = [];
        this.props.postFeed.forEach((item, index) => {
            feedList.push(
                <Feed.Event key={index}>
                    {/* <Feed.Label image='/images/avatar/small/joe.jpg' /> */}
                    <Feed.Content>
                        <Feed.Summary>
                            <a href={`../user/${item.username}`}>{item.username}</a>
                            <Feed.Date>{item.timestamp}</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra text as="a" href={`../post/${item._id}`}>
                            <h4>{item.title}</h4>
                            {item.body}
                        </Feed.Extra>
                        <Feed.Meta>
                            <Feed.Like>
                                <Icon name='thumbs up' />{item.likes}
                            </Feed.Like>
                            <Feed.Like>
                                <Icon name='thumbs down' />{item.dislikes}
                            </Feed.Like>
                        </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>
            );
        });
        return (
            <Feed>
                {feedList}
            </Feed>
        )
    }

    render() {
        // console.log(this.props.postFeed);
        if (this.props.postFeed.length) {
            // let editTimestamp;
            // if (this.props.editTimestamp) editTimestamp = `Last edited on ${this.props.editTimestamp}`;
            return (
                <Grid centered>
                    <Grid.Column width="8">
                        {this.postFeedList()}
                    </Grid.Column>
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
    return { /*'displayName': state.user.displayName,*/ "postFeed": state.postFeed }
}

export default connect(mapStateToProps, { fetchPostFeed })(PostFeed);