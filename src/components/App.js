import React from 'react';
import Header from '../components/headerComponents';
import { Switch, Route } from "react-router-dom";
import registerForm from './formComponents/register';
import loginForm from './formComponents/login';
import userProfile from './profileComponents';
import post from './postComponents';
import postFeed from './postComponents/postFeed';
import pageNotFound from './pageNotFound';


// "/" main feed/most popular / trending
const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={postFeed} />
        <Route path="/register" exact component={registerForm} />
        <Route path="/login" component={loginForm} />
        <Route path="/user/:username" exact component={userProfile} />
        <Route path="/post/:postId" exact component={post} />
        <Route path="*" component={pageNotFound} />
      </Switch>
    </div>
  );
}

export default App;