import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import CMS from '../views/cms';
import CMSTemplates from '../views/cmsTemplates';
import CMSTemplate from '../views/cmsTemplate';
import CMSMenus from '../views/cmsMenus';
import CMSMenu from '../views/cmsMenu';
import CMSPages from '../views/cmsPages';
import CMSPage from '../views/cmsPage';
import CMSPartials from '../views/cmsPartials';
import CMSPartial from '../views/cmsPartial';
import ForgottenPassword from '../views/forgottenPassword';
import Login from '../views/login';
import RedirectIfLoggedIn from '../components/redirectIfLoggedIn';
import Register from '../views/register';
import Auth from '../views/auth';
import ProtectedRoute from '../components/protectedRoute';
import Unauthorised from '../components/unauthorised';
import GeneratedPage from '../views/generatedPage';

const history = createHistory();

class Routing extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Switch>
            <RedirectIfLoggedIn path="/login" component={Login} />
            <RedirectIfLoggedIn path="/register" component={Register} />
            <RedirectIfLoggedIn path="/forgotten-password" component={ForgottenPassword} />
            <Route path="/auth" component={Auth} />
            <ProtectedRoute exact path="/cms" component={CMS} />
            <ProtectedRoute exact path="/cms/menus" component={CMSMenus} />
            <ProtectedRoute path="/cms/menus/:id" component={CMSMenu} />
            <ProtectedRoute exact path="/cms/templates" component={CMSTemplates} />
            <ProtectedRoute path="/cms/templates/:id" component={CMSTemplate} />
            <ProtectedRoute exact path="/cms/pages" component={CMSPages} />
            <ProtectedRoute path="/cms/pages/:id" component={CMSPage} />
            <ProtectedRoute exact path="/cms/partials" component={CMSPartials} />
            <ProtectedRoute path="/cms/partials/:id" component={CMSPartial} />
            <Route path="/unauthorised" component={Unauthorised} />
            <Route component={GeneratedPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routing;

