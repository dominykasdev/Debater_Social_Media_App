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
  import userProfile from './profileComponents';
  import post from './postComponents';
  import pageNotFound from './pageNotFound';


  // "/" main feed/most popular / trending
const App = () => {
    return(
        <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={null} />
            <Route path="/user/:username" exact component={userProfile} />
            <Route path="/post/:postId" exact component={post} />
            <Route component={pageNotFound} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;