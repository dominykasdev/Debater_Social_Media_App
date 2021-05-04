import React from 'react';

class Post extends React.Component {
    constructor(props){
        super(props)
    }

componentDidMount(){
    
}

render(){
    if(this.props.match.params.postId){
      return(
        <div>Post id {this.props.match.params.postId}</div>
    )  
    } else {
        return(
           <div>Loading...</div>
        )
    }
    
}


}

export default Post;