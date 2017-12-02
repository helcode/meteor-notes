import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import { Session } from 'meteor/session';
import { log } from 'util';


const onEnterNotePage = (nextState) => {
  //* nextState is a property in Meteor that we can use to inquiry information about loaded page.
  //* use console.log(nextState) to know what is inside
  //* prevState is a property in Meteor that we can use to inquiry information about previous page(s) !!check (s)

  Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = () => {
  Session.set('selectedNoteId',undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauthenticated' ;
  const isAuthenticatedPage = currentPagePrivacy === 'authenticated' ;

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
  
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange} >
      <Route path="/" component={Login} privacy="unauthenticated"  />
      <Route path="/signup" component={Signup} privacy="unauthenticated"  />
      <Route path="/dashboard" component={Dashboard} privacy="authenticated" />
      <Route path="/dashboard/:id" component={Dashboard} privacy="authenticated" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

//* Use of /:id will allow us to fetch ID from variable id
//* privacy is something we made up, there is no such property in Route/Routes/Router