import React from 'react';
import Header from '../components/headerComponents';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import history from '../history';
  import registerForm from './formComponents/register';
  import loginForm from './formComponents/login';
  import userProfile from './profileComponents';
  import post from './postComponents';
  import postFeed from './postComponents/postFeed';
  import pageNotFound from './pageNotFound';


  // "/" main feed/most popular / trending
const App = () => {
    return(
        <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={postFeed} />
            <Route path="/register" exact component={registerForm} />
            <Route path="/login" exact component={loginForm} />
            <Route path="/user/:username" exact component={userProfile} />
            <Route path="/post/:postId" exact component={post} />
            <Route component={pageNotFound} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;